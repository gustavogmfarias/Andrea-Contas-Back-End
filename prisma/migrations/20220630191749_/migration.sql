/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `lojistaTokens` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_fk_id_cliente_fkey";

-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_fk_id_lojista_fkey";

-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_fk_id_endereco_fkey";

-- DropForeignKey
ALTER TABLE "lojistaTokens" DROP CONSTRAINT "lojistaTokens_lojistaId_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_fk_id_lojista_fkey";

-- AlterTable
ALTER TABLE "lojistaTokens" DROP COLUMN "criadoEm",
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "lojistaTokens" ADD CONSTRAINT "lojistaTokens_lojistaId_fkey" FOREIGN KEY ("lojistaId") REFERENCES "lojistas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_fk_id_endereco_fkey" FOREIGN KEY ("fk_id_endereco") REFERENCES "enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_fk_id_lojista_fkey" FOREIGN KEY ("fk_id_lojista") REFERENCES "lojistas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_fk_id_cliente_fkey" FOREIGN KEY ("fk_id_cliente") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fk_id_lojista_fkey" FOREIGN KEY ("fk_id_lojista") REFERENCES "lojistas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
