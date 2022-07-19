/*
  Warnings:

  - You are about to drop the column `dataVencimento` on the `Conta` table. All the data in the column will be lost.
  - Added the required column `dataVencimentoFinal` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataVencimentoInicial` to the `Conta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "dataVencimento",
ADD COLUMN     "dataVencimentoFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataVencimentoInicial" TIMESTAMP(3) NOT NULL;
