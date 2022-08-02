/*
  Warnings:

  - You are about to drop the column `fk_id_endereco` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_cliente` on the `contas` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_lojista` on the `contas` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_conta` on the `pagamentos` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_lojista` on the `pagamentos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fkIdEndereco]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fkIdEndereco` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkIdCliente` to the `contas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkIdLojista` to the `contas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkIdConta` to the `pagamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkIdLojista` to the `pagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_fk_id_endereco_fkey";

-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_fk_id_cliente_fkey";

-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_fk_id_lojista_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_fk_id_conta_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_fk_id_lojista_fkey";

-- DropIndex
DROP INDEX "clientes_fk_id_endereco_key";

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "fk_id_endereco",
ADD COLUMN     "fkIdEndereco" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contas" DROP COLUMN "fk_id_cliente",
DROP COLUMN "fk_id_lojista",
ADD COLUMN     "fkIdCliente" TEXT NOT NULL,
ADD COLUMN     "fkIdLojista" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pagamentos" DROP COLUMN "fk_id_conta",
DROP COLUMN "fk_id_lojista",
ADD COLUMN     "fkIdConta" TEXT NOT NULL,
ADD COLUMN     "fkIdLojista" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clientes_fkIdEndereco_key" ON "clientes"("fkIdEndereco");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_fkIdEndereco_fkey" FOREIGN KEY ("fkIdEndereco") REFERENCES "enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_fkIdLojista_fkey" FOREIGN KEY ("fkIdLojista") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_fkIdCliente_fkey" FOREIGN KEY ("fkIdCliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fkIdConta_fkey" FOREIGN KEY ("fkIdConta") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_fkIdLojista_fkey" FOREIGN KEY ("fkIdLojista") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
