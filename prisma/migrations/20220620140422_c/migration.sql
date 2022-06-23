/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_tokens` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lojista_id` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "user_id",
ADD COLUMN     "lojista_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "lojistas" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'ADMIN',

    CONSTRAINT "lojistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "fk_id_endereco" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_fk_id_endereco_key" ON "clientes"("fk_id_endereco");

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_lojista_id_fkey" FOREIGN KEY ("lojista_id") REFERENCES "lojistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_fk_id_endereco_fkey" FOREIGN KEY ("fk_id_endereco") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
