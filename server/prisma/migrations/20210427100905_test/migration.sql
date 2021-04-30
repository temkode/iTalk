/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConnectionRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Listing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_listings_joined` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConnectionRequest" DROP CONSTRAINT "ConnectionRequest_listingId_fkey";

-- DropForeignKey
ALTER TABLE "ConnectionRequest" DROP CONSTRAINT "ConnectionRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_senderId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pictureId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_listings_joined" DROP CONSTRAINT "_listings_joined_A_fkey";

-- DropForeignKey
ALTER TABLE "_listings_joined" DROP CONSTRAINT "_listings_joined_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "ConnectionRequest";

-- DropTable
DROP TABLE "Listing";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_CategoryToUser";

-- DropTable
DROP TABLE "_listings_joined";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "RequestState";

-- CreateTable
CREATE TABLE "testA" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testB" (
    "id" SERIAL NOT NULL,
    "aID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testB" ADD FOREIGN KEY ("aID") REFERENCES "testA"("id") ON DELETE CASCADE ON UPDATE CASCADE;
