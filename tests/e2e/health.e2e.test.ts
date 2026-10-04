import request from "supertest";
import {
  describe,
  expect,
  it,
} from "vitest";

import app  from "../../src/app.js";

describe("Health API", () => {
  describe("GET /api/v1/health/live", () => {
    it("should return 200 when the application is alive", async () => {
      const response = await request(app)
        .get("/api/v1/health/live");

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        status: "ok",
      });
    });
  });
});

describe("404 handling", () => {
  it("should return 404 for an unknown endpoint", async () => {
    const response = await request(app)
      .get("/api/v1/does-not-exist");

    expect(response.status).toBe(404);
  });
});

describe("GET /api/v1/health/ready", () => {
  it("should return the application readiness statuws", async () => {
    const response = await request(app)
      .get("/api/v1/health/ready");

    expect([200, 503]).toContain(response.status);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("dependencies");
  });
});