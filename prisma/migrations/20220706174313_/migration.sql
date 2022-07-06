-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_fk_id_cliente_fkey";

-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_fk_id_lojista_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_fk_id_lojista_fkey";

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_fk_id_lojista_fkey" FOREIGN KEY ("fk_id_lojista") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_fk_id_cliente_fkey" FOREIGN KEY ("fk_id_cliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fk_id_lojista_fkey" FOREIGN KEY ("fk_id_lojista") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
