DROP INDEX "idx_content_category";--> statement-breakpoint
DROP INDEX "idx_content_key_published";--> statement-breakpoint
CREATE INDEX "idx_content_key_published" ON "meta_data" USING btree ("is_published");--> statement-breakpoint
ALTER TABLE "meta_data" DROP COLUMN "key";--> statement-breakpoint
ALTER TABLE "meta_data" DROP COLUMN "category";