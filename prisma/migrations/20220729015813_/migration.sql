/*
  Warnings:

  - You are about to drop the column `conteudoAtualizado` on the `logs` table. All the data in the column will be lost.
  - Added the required column `conteudoNovo` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logs" DROP COLUMN "conteudoAtualizado",
ADD COLUMN     "conteudoNovo" TEXT NOT NULL;
