/*
  Warnings:

  - Added the required column `dataVencimentoAtual` to the `contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contas" ADD COLUMN     "dataVencimentoAtual" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pagamentos" ALTER COLUMN "dataPagamento" DROP DEFAULT,
ALTER COLUMN "dataPagamento" SET DATA TYPE TIMESTAMP(3);
