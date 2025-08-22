import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgress:@temppass1@localhost:5432/testDB", // test Postgres URL
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
