/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,teacherId]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Listing.name_teacherId_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Listing.categoryId_teacherId_unique" ON "Listing"("categoryId", "teacherId");
