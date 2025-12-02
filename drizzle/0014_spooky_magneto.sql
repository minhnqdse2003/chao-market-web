CREATE TABLE "meta_data" (
	"key" varchar(128) NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"category" varchar(64),
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_content_key_published" ON "meta_data" USING btree ("key","is_published");--> statement-breakpoint
CREATE INDEX "idx_content_category" ON "meta_data" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_content_gin" ON "meta_data" USING gin ("content");