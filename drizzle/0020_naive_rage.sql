ALTER TABLE "consultations_products" ALTER COLUMN "purchasedName" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "consultations_products" ALTER COLUMN "original_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "consultations_products" ALTER COLUMN "purchased_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "consultations_products" ALTER COLUMN "wasDiscounted" DROP NOT NULL;