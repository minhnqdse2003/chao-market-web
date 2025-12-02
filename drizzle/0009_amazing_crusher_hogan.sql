ALTER TABLE "post" ALTER COLUMN "content" SET DATA TYPE jsonb USING content::jsonb;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "content" SET DEFAULT '{"en":null,"vi":null}'::jsonb;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "title" SET DATA TYPE jsonb USING title::jsonb;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "title" SET DEFAULT '{"en":null,"vi":null}'::jsonb;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "description" SET DATA TYPE jsonb USING description::jsonb;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "description" SET DEFAULT '{"en":null,"vi":null}'::jsonb;