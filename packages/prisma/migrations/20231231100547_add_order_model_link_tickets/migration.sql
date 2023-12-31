/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tripId` to the `seats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_fromTimelineId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_priceId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_seatId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_toTimelineId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_trainId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_tripId_fkey";

-- AlterTable
ALTER TABLE "seats" ADD COLUMN     "tripId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,
    "fromTimelineId" INTEGER NOT NULL,
    "toTimelineId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "userIdentification" TEXT NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "buyerName" TEXT NOT NULL,
    "buyerIdentification" TEXT NOT NULL,
    "buyerPhone" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_fromTimelineId_fkey" FOREIGN KEY ("fromTimelineId") REFERENCES "trip-timelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_toTimelineId_fkey" FOREIGN KEY ("toTimelineId") REFERENCES "trip-timelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
