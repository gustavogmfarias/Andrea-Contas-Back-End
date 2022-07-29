/*
  Warnings:

  - You are about to drop the column `editadoPorLojistaId` on the `logs` table. All the data in the column will be lost.
  - Added the required column `lojistaId` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_editadoPorLojistaId_fkey";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "editadoPorLojistaId",
ADD COLUMN     "lojistaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_lojistaId_fkey" FOREIGN KEY ("lojistaId") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
