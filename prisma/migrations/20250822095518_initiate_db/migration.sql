-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "displayName" TEXT,
    "tempMail" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "address" TEXT NOT NULL DEFAULT 'N/A',
    "country" TEXT NOT NULL DEFAULT 'N/A',
    "dateOfBirth" TIMESTAMP(3),
    "phoneNumber" TEXT NOT NULL DEFAULT 'N/A',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "public"."User"("userEmail");
