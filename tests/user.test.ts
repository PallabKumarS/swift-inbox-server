import request from "supertest";
import app from "../src/app";
import { prisma } from "../jest.setup";

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/users").send({
      userEmail: "test@example.com",
      tempMail: "temp@example.com",
    });

    expect(res.status).toBe(201);

    const user = await prisma.user.findUnique({
      where: { userEmail: "test@example.com" },
    });
    expect(user).not.toBeNull();
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: {
        userEmail: "all@test.com",
        tempMail: "alltemp@test.com",
      },
    });

    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
