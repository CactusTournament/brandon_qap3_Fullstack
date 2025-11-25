const request = require("supertest");
const express = require("express");
const session = require("express-session");

// Import your app (or create a small test version)
const app = require("../index"); // make sure index.js exports the app for testing

describe("User Management System", () => {
  let agent;

  beforeEach(() => {
    agent = request.agent(app); // preserves cookies across requests
  });

  test("Home page loads", async () => {
    const res = await agent.get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Login");
    expect(res.text).toContain("Sign Up");
  });

  test("Signup validation: missing fields", async () => {
    const res = await agent.post("/signup").send({ username: "", email: "", password: "" });
    expect(res.text).toContain("All fields are required.");
  });

  test("Signup validation: short password", async () => {
    const res = await agent.post("/signup").send({ username: "user", email: "a@b.com", password: "123" });
    expect(res.text).toContain("Password must be at least 8 characters.");
  });

  test("Signup success", async () => {
    const res = await agent.post("/signup").send({ username: "testuser", email: "test@example.com", password: "12345678" });
    expect(res.header.location).toBe("/landing"); // redirect to landing
  });

  test("Login fails with invalid credentials", async () => {
    const res = await agent.post("/login").send({ email: "wrong@example.com", password: "12345678" });
    expect(res.text).toContain("Invalid email or password.");
  });

  test("Login succeeds with correct credentials", async () => {
    await agent.post("/signup").send({ username: "loginuser", email: "login@example.com", password: "password123" });
    const res = await agent.post("/login").send({ email: "login@example.com", password: "password123" });
    expect(res.header.location).toBe("/landing");
  });
});
