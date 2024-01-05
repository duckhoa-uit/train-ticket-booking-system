/*
  Warnings:

  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[tripId,journeyStationId]` on the table `trip-timelines` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'PROCESSING', 'CANCELED');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "trip-timelines_tripId_journeyStationId_key" ON "trip-timelines"("tripId", "journeyStationId");
