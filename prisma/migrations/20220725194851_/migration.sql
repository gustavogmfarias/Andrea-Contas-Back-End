/*
  Warnings:

  - You are about to drop the column `conteudoNovo` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `lojistaId` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `modelEditadoId` on the `logs` table. All the data in the column will be lost.
  - Added the required column `conteudoAtualizado` to the `logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editadoPorLojistaId` to the `logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelAtualizadoId` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_lojistaId_fkey";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "conteudoNovo",
DROP COLUMN "lojistaId",
DROP COLUMN "modelEditadoId",
ADD COLUMN     "conteudoAtualizado" TEXT NOT NULL,
ADD COLUMN     "editadoPorLojistaId" TEXT NOT NULL,
ADD COLUMN     "modelAtualizadoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_editadoPorLojistaId_fkey" FOREIGN KEY ("editadoPorLojistaId") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
