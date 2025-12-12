ALTER TABLE "post_interactions" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "post_interactions" ADD COLUMN "guest_identifier" text;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_post_type" ON "post_interactions" USING btree ("userId","postId","type");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_guest_post_type" ON "post_interactions" USING btree ("guest_identifier","postId","type");