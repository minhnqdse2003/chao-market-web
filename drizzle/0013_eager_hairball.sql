CREATE TYPE "public"."post_status" AS ENUM('ACTIVE', 'DEACTIVE');--> statement-breakpoint
CREATE TYPE "public"."tag_types" AS ENUM('tag', 'news_type', 'market_type', 'community_type');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'DEACTIVE', 'BANNED');--> statement-breakpoint
CREATE TABLE "meta_data" (
	"version" integer DEFAULT 1 NOT NULL,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_setting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"settings" jsonb DEFAULT '{"theme":"dark","language":"en"}'::jsonb NOT NULL,
	"isDisclaimerAccepted" timestamp,
	CONSTRAINT "user_setting_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
ALTER TABLE "post" DROP CONSTRAINT "post_userId_user_id_fk";
--> statement-breakpoint
DROP INDEX "user_profile_user_id_unique";--> statement-breakpoint
-- Convert title: wrap existing text into { "en": <value>, "vi": null }
ALTER TABLE "post"
    ALTER COLUMN "title"
        SET DATA TYPE jsonb
    USING jsonb_build_object('en', "title", 'vi', NULL);

ALTER TABLE "post"
    ALTER COLUMN "title"
        SET DEFAULT '{"en": null, "vi": null}'::jsonb;

-- Convert description
ALTER TABLE "post"
    ALTER COLUMN "description"
        SET DATA TYPE jsonb
    USING jsonb_build_object('en', "description", 'vi', NULL);

ALTER TABLE "post"
    ALTER COLUMN "description"
        SET DEFAULT '{"en": null, "vi": null}'::jsonb;

-- Convert content
ALTER TABLE "post"
    ALTER COLUMN "content"
        SET DATA TYPE jsonb
    USING jsonb_build_object('en', "content", 'vi', NULL);

ALTER TABLE "post"
    ALTER COLUMN "content"
        SET DEFAULT '{"en": null, "vi": null}'::jsonb;
ALTER TABLE "post" ADD COLUMN "status" "post_status" DEFAULT 'ACTIVE';--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "tag_type" "tag_types";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "status" "user_status" DEFAULT 'ACTIVE';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "banUntil" timestamp;--> statement-breakpoint
ALTER TABLE "user_setting" ADD CONSTRAINT "user_setting_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_content_gin" ON "meta_data" USING gin ("content" jsonb_ops);--> statement-breakpoint
CREATE INDEX "idx_content_key_published" ON "meta_data" USING btree ("is_published" bool_ops);--> statement-breakpoint
CREATE INDEX "tag_type_idx" ON "tag" USING btree ("tag_type" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "user_profile_user_id_unique" ON "user_profile" USING btree ("userId" uuid_ops);--> statement-breakpoint
ALTER TABLE "post" DROP COLUMN "userId";