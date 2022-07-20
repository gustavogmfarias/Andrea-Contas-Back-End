-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_contaId_fkey";

-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "contaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
