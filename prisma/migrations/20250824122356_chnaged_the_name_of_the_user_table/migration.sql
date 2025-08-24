/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "tempMail" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "address" TEXT NOT NULL DEFAULT 'N/A',
    "country" TEXT NOT NULL DEFAULT 'N/A',
    "dateOfBirth" TIMESTAMP(3),
    "phoneNumber" TEXT NOT NULL DEFAULT 'N/A',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userEmail_key" ON "public"."users"("userEmail");
