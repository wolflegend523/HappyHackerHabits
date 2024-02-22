/*
  Warnings:

  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Habit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HabitCommit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedQuote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "day_of_week" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "habit_frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_goal_id_fkey";

-- DropForeignKey
ALTER TABLE "HabitCommit" DROP CONSTRAINT "HabitCommit_habit_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SavedQuote" DROP CONSTRAINT "SavedQuote_quote_id_fkey";

-- DropForeignKey
ALTER TABLE "SavedQuote" DROP CONSTRAINT "SavedQuote_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_goal_id_fkey";

-- DropTable
DROP TABLE "Goal";

-- DropTable
DROP TABLE "Habit";

-- DropTable
DROP TABLE "HabitCommit";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Quote";

-- DropTable
DROP TABLE "SavedQuote";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "DayOfWeek";

-- DropEnum
DROP TYPE "HabitFrequency";

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(360) NOT NULL,
    "password_hash" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email_confirmed_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "profile" (
    "profile_id" SERIAL NOT NULL,
    "display_name" VARCHAR(40),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "quote" (
    "quote_id" SERIAL NOT NULL,
    "quote_text" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("quote_id")
);

-- CreateTable
CREATE TABLE "saved_quote" (
    "user_id" INTEGER NOT NULL,
    "quote_id" INTEGER NOT NULL,
    "saved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_quote_pkey" PRIMARY KEY ("user_id","quote_id")
);

-- CreateTable
CREATE TABLE "goal" (
    "goal_id" SERIAL NOT NULL,
    "goal_name" TEXT NOT NULL,
    "goal_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deployed_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "goal_pkey" PRIMARY KEY ("goal_id")
);

-- CreateTable
CREATE TABLE "task" (
    "task_id" SERIAL NOT NULL,
    "task_name" TEXT NOT NULL,
    "task_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduled_at" TIMESTAMP(3),
    "ends_at" TIMESTAMP(3),
    "committed_at" TIMESTAMP(3),
    "goal_id" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "habit" (
    "habit_id" SERIAL NOT NULL,
    "habit_name" TEXT NOT NULL,
    "habit_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_at" TIMESTAMP(3),
    "ends_at" TIMESTAMP(3),
    "frequency" "habit_frequency" NOT NULL DEFAULT 'DAILY',
    "daysOfWeek" "day_of_week"[],
    "deployed_at" TIMESTAMP(3),
    "goal_id" INTEGER NOT NULL,

    CONSTRAINT "habit_pkey" PRIMARY KEY ("habit_id")
);

-- CreateTable
CREATE TABLE "habit_commit" (
    "habit_commit_id" SERIAL NOT NULL,
    "habit_id" INTEGER NOT NULL,
    "committed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "habit_commit_pkey" PRIMARY KEY ("habit_commit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_quote" ADD CONSTRAINT "saved_quote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_quote" ADD CONSTRAINT "saved_quote_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote"("quote_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal" ADD CONSTRAINT "goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goal"("goal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goal"("goal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_commit" ADD CONSTRAINT "habit_commit_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habit"("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE;
