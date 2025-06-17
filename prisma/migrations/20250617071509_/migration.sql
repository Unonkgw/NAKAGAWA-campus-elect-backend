/*
  Warnings:

  - A unique constraint covering the columns `[electionId,positionId,voterId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `electionId` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voterId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_electionId_fkey";

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "electionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "positionId" TEXT NOT NULL,
ADD COLUMN     "voterId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Election" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "Election_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Election_isActive_idx" ON "Election"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_electionId_positionId_voterId_key" ON "Vote"("electionId", "positionId", "voterId");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
