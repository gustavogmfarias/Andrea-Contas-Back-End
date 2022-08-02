/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Conta` table. All the data in the column will be lost.
  - You are about to drop the column `valor_atual` on the `Conta` table. All the data in the column will be lost.
  - You are about to drop the column `valor_inicial` on the `Conta` table. All the data in the column will be lost.
  - You are about to drop the column `valor_parcela` on the `Conta` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `lojistas` table. All the data in the column will be lost.
  - Added the required column `numeroParcelasAtual` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorAtual` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorInicial` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorParcela` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `lojistas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `lojistas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "criadoEm",
DROP COLUMN "valor_atual",
DROP COLUMN "valor_inicial",
DROP COLUMN "valor_parcela",
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "numeroParcelasAtual" INTEGER NOT NULL,
ADD COLUMN     "valorAtual" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorInicial" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorParcela" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "avatar_url",
DROP COLUMN "criadoEm",
ADD COLUMN     "avatarUrl" TEXT NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lojistas" DROP COLUMN "password",
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;
