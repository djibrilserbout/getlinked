/*
  Warnings:

  - You are about to drop the column `role` on the `Education` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Education` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';
