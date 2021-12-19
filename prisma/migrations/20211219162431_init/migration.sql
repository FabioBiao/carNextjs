/*
  Warnings:

  - Added the required column `cilindrada` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doors` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `miles` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pontecy` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "cilindrada" INTEGER NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "doors" INTEGER NOT NULL,
ADD COLUMN     "fuel" TEXT NOT NULL,
ADD COLUMN     "miles" INTEGER NOT NULL,
ADD COLUMN     "pontecy" INTEGER NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
