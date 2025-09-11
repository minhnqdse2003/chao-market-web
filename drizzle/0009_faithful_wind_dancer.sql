ALTER TABLE "transaction" ALTER COLUMN "dateOfBirth" TYPE timestamp USING "dateOfBirth"::timestamp;
ALTER TABLE "transaction" ALTER COLUMN "dateOfBirth" DROP NOT NULL;