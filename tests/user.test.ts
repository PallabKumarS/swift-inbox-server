import request from "supertest";
import app from "../src/app";
import prisma from "../src/helpers/prismaClient";

let userId: string;

beforeAll(async () => {
  // Clean database
  await prisma.user.deleteMany();

  // Create test user
  const user = await prisma.user.create({
    data: {
      password: "testpass",
      userEmail: "test@example.com",
      displayName: "Test User",
    },
  });

  console.log("user", user);

  userId = user.id;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User API", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].id).toBe(userId);
  });

  it("should get a user by id", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it("should update a user by id", async () => {
    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .send({ displayName: "Updated Name" });
    expect(res.status).toBe(200);
    expect(res.body.displayName).toBe("Updated Name");
  });

  it("should delete a user by id", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });
});
