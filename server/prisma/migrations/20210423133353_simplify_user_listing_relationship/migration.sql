/*
  Warnings:

  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,teacherId]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_listingId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Enrollment";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "_listings_joined" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_listings_joined_AB_unique" ON "_listings_joined"("A", "B");

-- CreateIndex
CREATE INDEX "_listings_joined_B_index" ON "_listings_joined"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Listing.name_teacherId_unique" ON "Listing"("name", "teacherId");

-- AddForeignKey
ALTER TABLE "_listings_joined" ADD FOREIGN KEY ("A") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_listings_joined" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
