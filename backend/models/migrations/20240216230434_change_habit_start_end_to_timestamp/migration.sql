/*
  Warnings:

  - The `start_at` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ends_at` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "start_at",
ADD COLUMN     "start_at" TIMESTAMP(3),
DROP COLUMN "ends_at",
ADD COLUMN     "ends_at" TIMESTAMP(3);
