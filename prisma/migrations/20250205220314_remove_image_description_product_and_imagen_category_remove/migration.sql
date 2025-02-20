/*
  Warnings:

  - You are about to drop the column `imagen` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imagen` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imagen";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "imagen",
ADD COLUMN     "costo" DOUBLE PRECISION NOT NULL DEFAULT 0.00;
