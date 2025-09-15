CREATE TABLE "consultation_services" (
                                         "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                                         "name" text NOT NULL,
                                         "description" text,
                                         "imageUrl" text,
                                         "createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultation" (
                                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                                "firstName" text NOT NULL,
                                "lastName" text NOT NULL,
                                "dateOfBirth" timestamp,
                                "email" text NOT NULL,
                                "phoneNumber" text NOT NULL,
                                "socialNetwork" text,
                                "contactMethods" text[] NOT NULL,
                                "message" text,
                                "totalAmount" integer NOT NULL,
                                "status" text NOT NULL,
                                "createdAt" timestamp DEFAULT now() NOT NULL,
                                "updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultations_products" (
                                          "consultationId" uuid NOT NULL,
                                          "consultationServiceId" uuid NOT NULL,
                                          CONSTRAINT "consultations_products_consultationId_productId_pk" PRIMARY KEY("consultationId","consultationServiceId")
);
--> statement-breakpoint
DROP TABLE IF EXISTS "cart_item";--> statement-breakpoint
DROP TABLE IF EXISTS "cart";--> statement-breakpoint
DROP TABLE IF EXISTS "product";--> statement-breakpoint
DROP TABLE IF EXISTS "transaction_item";--> statement-breakpoint
DROP TABLE IF EXISTS "transaction";--> statement-breakpoint
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'post' AND column_name = 'market') THEN
ALTER TABLE "post" ADD COLUMN "market" text DEFAULT 'all' NOT NULL;
END IF;
END $$;
ALTER TABLE "consultations_products" ADD CONSTRAINT "consultations_products_consultationId_consultation_id_fk" FOREIGN KEY ("consultationId") REFERENCES "public"."consultation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultations_products" ADD CONSTRAINT "consultations_products_productId_consultation_services_id_fk" FOREIGN KEY ("consultationServiceId") REFERENCES "public"."consultation_services"("id") ON DELETE cascade ON UPDATE no action;