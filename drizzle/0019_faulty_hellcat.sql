CREATE TYPE "public"."transaction_status" AS ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');--> statement-breakpoint
CREATE TABLE "instructor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"bio" text,
	"avatarUrl" text,
	"expertise" text[],
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultationId" uuid NOT NULL,
	"userId" uuid,
	"amount" numeric(19, 4) NOT NULL,
	"currency" text DEFAULT 'VND' NOT NULL,
	"status" "transaction_status" DEFAULT 'PENDING' NOT NULL,
	"paymentGateway" text,
	"gatewayTransactionId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "consultation_services" ALTER COLUMN "name" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "consultation_services" ALTER COLUMN "description" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "marketType" text;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "resource" text;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "shortDescription" jsonb;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "instructionLink" text;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "downloadLabel" jsonb DEFAULT '{"en":"Link","vi":"Link"}'::jsonb;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "downloadLink" text;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "views" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "price" numeric(19, 4) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "discount_price" numeric(19, 4);--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "isDiscountPriceVisible" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD COLUMN "instructorId" uuid;--> statement-breakpoint
ALTER TABLE "consultations_products" ADD COLUMN "purchasedName" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "consultations_products" ADD COLUMN "original_price" numeric(19, 4) NOT NULL;--> statement-breakpoint
ALTER TABLE "consultations_products" ADD COLUMN "purchased_price" numeric(19, 4) NOT NULL;--> statement-breakpoint
ALTER TABLE "consultations_products" ADD COLUMN "wasDiscounted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_consultationId_consultation_id_fk" FOREIGN KEY ("consultationId") REFERENCES "public"."consultation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_services" ADD CONSTRAINT "consultation_services_instructorId_instructor_id_fk" FOREIGN KEY ("instructorId") REFERENCES "public"."instructor"("id") ON DELETE set null ON UPDATE no action;