CREATE TYPE "public"."user_interactions_type" AS ENUM('LIKE', 'DISLIKE');--> statement-breakpoint
CREATE TABLE "post_interactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"postId" uuid NOT NULL,
	"type" "user_interactions_type" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."post_type";--> statement-breakpoint
CREATE TYPE "public"."post_type" AS ENUM('insight', 'community');--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "type" SET DATA TYPE "public"."post_type" USING "type"::"public"."post_type";--> statement-breakpoint
DROP INDEX "idx_content_key_published";--> statement-breakpoint
DROP INDEX "idx_content_gin";--> statement-breakpoint
DROP INDEX "tag_type_idx";--> statement-breakpoint
DROP INDEX "user_profile_user_id_unique";--> statement-breakpoint
ALTER TABLE "post_interactions" ADD CONSTRAINT "user_interactions_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_interactions" ADD CONSTRAINT "user_interactions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_content_key_published" ON "meta_data" USING btree ("is_published" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_content_gin" ON "meta_data" USING gin ("content" jsonb_ops);--> statement-breakpoint
CREATE INDEX "tag_type_idx" ON "tag" USING btree ("tag_type" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "user_profile_user_id_unique" ON "user_profile" USING btree ("userId" uuid_ops);