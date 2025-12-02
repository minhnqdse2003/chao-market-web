CREATE TYPE "public"."tag_types" AS ENUM('tag', 'news_type', 'market_type', 'community_type');--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "tag_type" "tag_types";