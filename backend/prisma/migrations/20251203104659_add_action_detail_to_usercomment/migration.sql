/*
  Warnings:

  - Added the required column `action` to the `userComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userComment" ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "detail" TEXT;
