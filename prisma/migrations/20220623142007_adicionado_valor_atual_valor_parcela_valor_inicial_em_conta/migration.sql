/*
  Warnings:

  - You are about to drop the column `valor` on the `Conta` table. All the data in the column will be lost.
  - Added the required column `valor_atual` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_inicial` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_parcela` to the `Conta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "valor",
ADD COLUMN     "valor_atual" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valor_inicial" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valor_parcela" DOUBLE PRECISION NOT NULL;
