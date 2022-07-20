-- CreateEnum
CREATE TYPE "LogRepository" AS ENUM ('CLIENTE', 'CONTA', 'LOJISTA');

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "logRepository" "LogRepository" NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conteudoAnterior" TEXT NOT NULL DEFAULT E'Sem conteúdo Anterior',
    "conteudoNovo" TEXT NOT NULL,
    "lojistaId" TEXT NOT NULL,
    "contaId" TEXT NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_lojistaId_fkey" FOREIGN KEY ("lojistaId") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
