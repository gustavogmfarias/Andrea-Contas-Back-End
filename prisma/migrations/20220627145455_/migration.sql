/*
  Warnings:

  - You are about to drop the `user_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_lojista_id_fkey";

-- DropTable
DROP TABLE "user_tokens";

-- CreateTable
CREATE TABLE "lojista_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "lojista_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lojista_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lojista_tokens" ADD CONSTRAINT "lojista_tokens_lojista_id_fkey" FOREIGN KEY ("lojista_id") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
