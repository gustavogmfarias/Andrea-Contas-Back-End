/*
  Warnings:

  - You are about to drop the `Conta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_fk_id_cliente_fkey";

-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_fk_id_lojista_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_fk_id_conta_fkey";

-- DropTable
DROP TABLE "Conta";

-- CreateTable
CREATE TABLE "contas" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editadoEm" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT NOT NULL,
    "numeroParcelas" INTEGER NOT NULL,
    "numeroParcelasAtual" INTEGER NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "valorInicial" DOUBLE PRECISION NOT NULL,
    "valorAtual" DOUBLE PRECISION NOT NULL,
    "dataVencimentoInicial" TIMESTAMP(3) NOT NULL,
    "dataVencimentoFinal" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "fk_id_lojista" TEXT NOT NULL,
    "fk_id_cliente" TEXT NOT NULL,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_fk_id_lojista_fkey" FOREIGN KEY ("fk_id_lojista") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_fk_id_cliente_fkey" FOREIGN KEY ("fk_id_cliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fk_id_conta_fkey" FOREIGN KEY ("fk_id_conta") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
