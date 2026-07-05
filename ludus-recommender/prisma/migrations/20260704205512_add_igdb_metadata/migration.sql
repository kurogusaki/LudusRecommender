/*
  Warnings:

  - A unique constraint covering the columns `[igdbId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN "developer" TEXT;
ALTER TABLE "Game" ADD COLUMN "gameModes" JSONB;
ALTER TABLE "Game" ADD COLUMN "genres" JSONB;
ALTER TABLE "Game" ADD COLUMN "igdbId" INTEGER;
ALTER TABLE "Game" ADD COLUMN "keywords" JSONB;
ALTER TABLE "Game" ADD COLUMN "platforms" JSONB;
ALTER TABLE "Game" ADD COLUMN "publisher" TEXT;
ALTER TABLE "Game" ADD COLUMN "releaseDate" DATETIME;
ALTER TABLE "Game" ADD COLUMN "slug" TEXT;
ALTER TABLE "Game" ADD COLUMN "summary" TEXT;
ALTER TABLE "Game" ADD COLUMN "themes" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");
