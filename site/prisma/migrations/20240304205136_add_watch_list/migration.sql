-- CreateTable
CREATE TABLE "_Watchers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Watchers_A_fkey" FOREIGN KEY ("A") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Watchers_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Watchers_AB_unique" ON "_Watchers"("A", "B");

-- CreateIndex
CREATE INDEX "_Watchers_B_index" ON "_Watchers"("B");
