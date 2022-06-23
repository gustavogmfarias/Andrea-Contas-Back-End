/*
  Warnings:

  - Added the required column `avatar_url` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "avatar_url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Conta" (
    "id" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "numeroParcelas" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_conta" TEXT NOT NULL,
    "fk_id_lojista" TEXT NOT NULL,
    "valorPagamento" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fk_id_lojista_fkey" FOREIGN KEY ("fk_id_lojista") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fk_id_conta_fkey" FOREIGN KEY ("fk_id_conta") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
