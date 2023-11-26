/*
  Warnings:

  - You are about to drop the `Hi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Hi";

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "depart_station" TEXT,
    "arrive_station" TEXT,
    "depart_time" TEXT,
    "arrive_time" TEXT,
    "depart_day" TEXT,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);
