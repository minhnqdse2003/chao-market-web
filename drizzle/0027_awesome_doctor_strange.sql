CREATE TYPE "public"."metric_type" AS ENUM('equity_growth', 'growth', 'deposit', 'withdrawal');--> statement-breakpoint
CREATE TABLE "client_account" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text,
	"scraped_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "client_account_metrics" (
	"account_id" varchar(50) NOT NULL,
	"metric_date" date NOT NULL,
	"type" "metric_type" NOT NULL,
	"value" numeric(15, 2) NOT NULL,
	CONSTRAINT "client_account_metrics_account_id_metric_date_type_pk" PRIMARY KEY("account_id","metric_date","type")
);
--> statement-breakpoint
CREATE TABLE "client_account_stats" (
	"account_id" varchar(50) PRIMARY KEY NOT NULL,
	"gain" numeric(15, 2),
	"abs_gain" numeric(15, 2),
	"daily" numeric(15, 2),
	"monthly" numeric(15, 2),
	"drawdown" numeric(15, 2),
	"balance" numeric(15, 2),
	"equity" numeric(15, 2),
	"profit" numeric(15, 2),
	"deposits_total" numeric(15, 2),
	"withdrawals_total" numeric(15, 2),
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "client_account_metrics" ADD CONSTRAINT "client_account_metrics_account_id_client_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."client_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_account_stats" ADD CONSTRAINT "client_account_stats_account_id_client_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."client_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "metric_search_idx" ON "client_account_metrics" USING btree ("account_id","type","metric_date");