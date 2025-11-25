const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { findByEmail, findByUsername, createUser } = require("../models/users");
const { ensureGuest } = require("../middleware/auth");

// Render pages
router.get("/signup", ensureGuest, (req, res) => {
  res.render("signup", { user: null });
});

router.get("/login", ensureGuest, (req, res) => {
  res.render("login", { user: null });
});

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.send("All fields are required.");
  if (password.length < 8) return res.send("Password must be at least 8 characters.");
  if (findByEmail(email) || findByUsername(username)) return res.send("Username or email already exists.");

  const newUser = await createUser(username, email, password);
  req.session.user = newUser;
  res.redirect("/landing");
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = findByEmail(email);
  if (!user) return res.send("Invalid email or password.");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Invalid email or password.");

  req.session.user = user;
  res.redirect("/landing");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("Error logging out.");
    res.redirect("/");
  });
});

module.exports = router;
