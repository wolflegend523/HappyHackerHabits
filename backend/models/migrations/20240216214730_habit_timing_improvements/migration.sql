/*
  Warnings:

  - You are about to drop the column `commited_at` on the `HabitCommit` table. All the data in the column will be lost.
  - You are about to drop the column `commited_at` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" ALTER COLUMN "start_at" DROP NOT NULL,
ALTER COLUMN "ends_at" DROP NOT NULL,
ALTER COLUMN "frequency" SET DEFAULT 'DAILY',
ALTER COLUMN "deployed_at" DROP NOT NULL,
ALTER COLUMN "deployed_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "HabitCommit" DROP COLUMN "commited_at",
ADD COLUMN     "committed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "commited_at",
ADD COLUMN     "committed_at" TIMESTAMP(3);
