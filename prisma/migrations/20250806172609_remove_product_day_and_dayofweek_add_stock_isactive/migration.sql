/*
  Warnings:

  - You are about to drop the `days_of_week` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_days` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_days" DROP CONSTRAINT "product_days_day_of_week_id_fkey";

-- DropForeignKey
ALTER TABLE "product_days" DROP CONSTRAINT "product_days_product_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "days_of_week";

-- DropTable
DROP TABLE "product_days";
