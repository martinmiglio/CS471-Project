-- Begin Transaction
BEGIN TRANSACTION;

-- Create a new virtual table for FTS search

CREATE VIRTUAL TABLE "Listing_fts" USING FTS4 ( "title",
                                                "description");

-- Populate the FTS virtual table with data from the original "Listing" table

INSERT INTO "Listing_fts" ("rowid",
                           "title",
                           "description")
SELECT "rowid",
       "title",
       "description"
FROM "Listing";

-- Drop the original "Listing" table

DROP TABLE "Listing";

-- Rename the FTS virtual table to the original table name

ALTER TABLE "Listing_fts" RENAME TO "Listing";

-- Create a new unique index on the "Listing" table

CREATE UNIQUE INDEX "Listing_id_unique" ON "Listing"("id");

-- Commit Transaction

COMMIT;

