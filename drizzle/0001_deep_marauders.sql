ALTER TABLE "post" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "description" text;