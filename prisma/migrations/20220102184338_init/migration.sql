/*
  Warnings:

  - The `fuel` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('DIESEL', 'ELECTRICO', 'GASOLINA', 'GPL', 'HIBRIDO_DIESEL', 'HIBRIDO_GASOLINA');

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "fuel",
ADD COLUMN     "fuel" "Fuel" NOT NULL DEFAULT E'GASOLINA';
