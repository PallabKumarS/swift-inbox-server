import request from "supertest";
import app from "../src/app";

describe("Health Check", () => {
  it("should return server running message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("🚀 Server is running successfully! 🚀");
  });
});
