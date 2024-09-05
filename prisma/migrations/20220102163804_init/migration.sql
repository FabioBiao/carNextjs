/*
  Warnings:

  - Added the required column `details` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "details" INTEGER NOT NULL,
ADD COLUMN     "modelId" INTEGER NOT NULL,
ADD COLUMN     "photoUrl" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
