-- AlterTable
ALTER TABLE "pagamentos" ADD COLUMN     "fkIdCliente" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fkIdCliente_fkey" FOREIGN KEY ("fkIdCliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
