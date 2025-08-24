import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // test Postgres URL
    },
  },
});

beforeAll(async () => {});
afterEach(async () => {
  await prisma.user.deleteMany();
});
afterAll(async () => {
  await prisma.$disconnect();
});
