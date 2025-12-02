CREATE TYPE "public"."post_status" AS ENUM('ACTIVE', 'DEACTIVE');--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "status" "post_status" DEFAULT 'ACTIVE';