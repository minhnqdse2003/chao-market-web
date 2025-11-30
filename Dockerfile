# 1. Base Image
FROM node:20-alpine AS base

# 2. Dependencies
FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Enable pnpm via Corepack
RUN corepack enable

COPY package.json pnpm-lock.yaml* ./

# Install dependencies (ignoring scripts helps avoid local-only failures)
RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm i --frozen-lockfile --ignore-scripts; \
  else echo "Lockfile not found." && exit 1; fi

# 3. Builder
FROM base AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Fix: Use "=" and disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# --- CRITICAL: FIX BUILD FAILURES ---
# If your app needs NEXT_PUBLIC_ vars during build, default them to avoid crashes
# (They will be overwritten by Nginx/Browser at runtime anyway)
ENV NEXT_PUBLIC_API_URL=http://localhost
ENV NEXTAUTH_SECRET=build_placeholder_secret
ENV NEXTAUTH_URL=http://localhost

# Now run the build
RUN pnpm run build

# 4. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# Copy the standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
