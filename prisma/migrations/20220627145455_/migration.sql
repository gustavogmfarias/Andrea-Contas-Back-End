/*
  Warnings:

  - You are about to drop the `user_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_lojistaId_fkey";

-- DropTable
DROP TABLE "user_tokens";

-- CreateTable
CREATE TABLE "lojistaTokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "lojistaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lojistaTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lojistaTokens" ADD CONSTRAINT "lojistaTokens_lojistaId_fkey" FOREIGN KEY ("lojistaId") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
