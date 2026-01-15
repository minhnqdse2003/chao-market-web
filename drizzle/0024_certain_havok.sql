ALTER TABLE "transaction" ADD COLUMN "accessGrantedAt" timestamp;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "accessError" text;