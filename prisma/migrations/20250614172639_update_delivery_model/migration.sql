/*
  Warnings:

  - You are about to drop the column `estimated_delivery_time` on the `orders` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DELIVERY_PERSON';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "estimated_delivery_time";
