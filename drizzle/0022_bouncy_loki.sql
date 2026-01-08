CREATE TABLE "affiliate_code" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"discountPercent" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"expiresAt" timestamp,
	CONSTRAINT "affiliate_code_code_unique" UNIQUE("code")
);
