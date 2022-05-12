/*
  Warnings:

  - You are about to drop the column `roles` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'EDITOR', 'AUTHOR');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roles",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER',
ALTER COLUMN "avatar_url" DROP NOT NULL;

-- DropEnum
DROP TYPE "roles";
