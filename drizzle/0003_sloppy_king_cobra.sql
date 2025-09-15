CREATE TABLE "transaction_item"
(
    "id"                    uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "transactionId"         uuid                                       NOT NULL,
    "consultationServiceId" uuid                                       NOT NULL,
    "quantity"              integer                                    NOT NULL,
    "price"                 integer                                    NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transaction_item"
    ADD CONSTRAINT "transaction_item_transactionId_transaction_id_fk" FOREIGN KEY ("transactionId") REFERENCES "public"."transaction" ("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_item"
    ADD CONSTRAINT "transaction_item_productId_product_id_fk" FOREIGN KEY ("consultationServiceId") REFERENCES "public"."product" ("id") ON DELETE cascade ON UPDATE no action;