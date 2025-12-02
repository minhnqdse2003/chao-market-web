ALTER TABLE "user" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'::text;--> statement-breakpoint
DROP TYPE "public"."user_status";--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'DEACTIVE');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'::"public"."user_status";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DATA TYPE "public"."user_status" USING "status"::"public"."user_status";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isBanned" timestamp;