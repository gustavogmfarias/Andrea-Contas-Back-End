/*
  Warnings:

  - You are about to drop the column `foto` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `lojistas` table. All the data in the column will be lost.
  - Added the required column `fk_id_cliente` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_id_lojista` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conta" ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_id_cliente" TEXT NOT NULL,
ADD COLUMN     "fk_id_lojista" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "foto",
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "enderecos" ADD COLUMN     "cep" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lojistas" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_fk_id_lojista_fkey" FOREIGN KEY ("fk_id_lojista") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_fk_id_cliente_fkey" FOREIGN KEY ("fk_id_cliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
