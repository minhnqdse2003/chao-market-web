ALTER TABLE "post" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "readingTime" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "seoTitle" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "seoDescription" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "seoKeywords" text[];--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "ogImage" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "canonicalUrl" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "robots" text;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_slug_unique" UNIQUE("slug");