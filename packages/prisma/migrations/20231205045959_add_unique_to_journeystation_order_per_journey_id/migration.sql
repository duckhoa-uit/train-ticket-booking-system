/*
  Warnings:

  - A unique constraint covering the columns `[journeyId,order]` on the table `journey-schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "journey-schedules_journeyId_order_key" ON "journey-schedules"("journeyId", "order");
