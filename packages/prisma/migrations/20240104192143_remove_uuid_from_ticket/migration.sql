/*
  Warnings:

  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");
