/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `lojista_tokens` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "lojista_tokens" DROP CONSTRAINT "lojista_tokens_lojista_id_fkey";

-- AlterTable
ALTER TABLE "lojista_tokens" DROP COLUMN "criadoEm",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "lojista_tokens" ADD CONSTRAINT "lojista_tokens_lojista_id_fkey" FOREIGN KEY ("lojista_id") REFERENCES "lojistas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
