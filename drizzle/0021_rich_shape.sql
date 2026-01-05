ALTER TYPE "public"."tag_types" ADD VALUE 'product_type';--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "type" text DEFAULT 'Holistic' NOT NULL;