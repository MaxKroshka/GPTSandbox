import request from "supertest";
import app from "../src/app";

describe("Auth endpoints", () => {
  let token: string;

  // Signup endpoint tests
  describe("POST /api/auth/signup", () => {
    it("should create a new user and return a JWT token", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "testuser@example.com",
        password: "password123",
        name: "Test User"
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("token");
      token = res.body.token;
    });
    it("should return an error if the email is already taken", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "testuser@example.com",
        password: "password123",
        name: "Test User"
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "Email address already in use"
      );
    });
    it("should return an error if the email is invalid", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "invalidemail",
        password: "password123",
        name: "Test User"
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("errors");
    });
  });

  // Login endpoint tests
  describe("POST /api/auth/login", () => {
    it("should authenticate the user and return a JWT token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "testuser@example.com", password: "password123" });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("token");
      token = res.body.token;
    });
    it("should return an error if the email is invalid", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "invalidemail", password: "password123" });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("errors");
    });
    it("should return an error if the password is incorrect", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "testuser@example.com", password: "incorrectpassword" });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });
  });
});
