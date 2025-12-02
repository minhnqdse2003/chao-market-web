ALTER TABLE "post" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."post_type";--> statement-breakpoint
CREATE TYPE "public"."post_type" AS ENUM('insight', 'community', 'news', 'events');--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "type" SET DATA TYPE "public"."post_type" USING "type"::"public"."post_type";--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "imageUrl" text;