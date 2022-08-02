/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `lojistaTokens` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "lojistaTokens" DROP CONSTRAINT "lojistaTokens_lojistaId_fkey";

-- AlterTable
ALTER TABLE "lojistaTokens" DROP COLUMN "criadoEm",
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "lojistaTokens" ADD CONSTRAINT "lojistaTokens_lojistaId_fkey" FOREIGN KEY ("lojistaId") REFERENCES "lojistas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
