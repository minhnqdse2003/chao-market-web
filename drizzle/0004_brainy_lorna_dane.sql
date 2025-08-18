ALTER TABLE "transaction" ADD COLUMN "firstName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "lastName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "dateOfBirth" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "phoneNumber" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "socialNetwork" text;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "contactMethods" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "message" text;