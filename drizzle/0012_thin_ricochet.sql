-- For name column
ALTER TABLE "consultation_services"
    ALTER COLUMN "name" SET DATA TYPE json USING "name"::json;

-- For description column
ALTER TABLE "consultation_services"
    ALTER COLUMN "description" SET DATA TYPE json USING "description"::json;