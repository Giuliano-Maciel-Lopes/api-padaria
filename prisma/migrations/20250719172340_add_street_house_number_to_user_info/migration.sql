/*
  Warnings:

  - You are about to drop the column `address` on the `user_infos` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `user_infos` table. All the data in the column will be lost.
  - Added the required column `house_number` to the `user_infos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user_infos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `user_infos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_infos" DROP COLUMN "address",
DROP COLUMN "phone_number",
ADD COLUMN     "house_number" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
