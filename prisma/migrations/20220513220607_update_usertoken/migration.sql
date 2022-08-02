/*
  Warnings:

  - You are about to drop the column `end_at` on the `user_tokens` table. All the data in the column will be lost.
  - Added the required column `expiresDate` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "end_at",
ADD COLUMN     "expiresDate" TIMESTAMP(3) NOT NULL;
