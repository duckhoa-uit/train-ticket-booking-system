/*
  Warnings:

  - A unique constraint covering the columns `[trainId,order]` on the table `carriages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "carriages_trainId_order_key" ON "carriages"("trainId", "order");
