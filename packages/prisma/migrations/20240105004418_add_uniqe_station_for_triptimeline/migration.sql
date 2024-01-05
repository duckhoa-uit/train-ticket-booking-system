/*
  Warnings:

  - A unique constraint covering the columns `[tripId,journeyStationId]` on the table `trip-timelines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "trip-timelines_tripId_journeyStationId_key" ON "trip-timelines"("tripId", "journeyStationId");
