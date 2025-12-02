CREATE TABLE "user_setting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"settings" jsonb DEFAULT '{"theme":"dark","language":"en"}'::jsonb NOT NULL,
	"updatedAt" timestamp,
	CONSTRAINT "user_setting_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
ALTER TABLE "user_setting" ADD CONSTRAINT "user_setting_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;