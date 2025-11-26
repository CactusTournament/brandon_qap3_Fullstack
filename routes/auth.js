const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { findByEmail, findByUsername, createUser } = require("../models/users");
const { ensureGuest } = require("../middleware/auth");

// -----------------------------
// Email Validation (domain 2–4 letters)
// -----------------------------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,4}$/i.test(email);
}

// -----------------------------
// Strong Password Validation
// -----------------------------
function isStrongPassword(password) {
  // 8+ chars, 1 uppercase, 1 number, 1 special char
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
}

// -----------------------------
// Render Pages
// -----------------------------
router.get("/signup", ensureGuest, (req, res) => {
  res.render("signup", { user: null, message: req.session.message || null });
  req.session.message = null;
});

router.get("/login", ensureGuest, (req, res) => {
  res.render("login", { user: null, message: req.session.message || null });
  req.session.message = null;
});

// -----------------------------
// Signup
// -----------------------------
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Empty fields
  if (!username || !email || !password) {
    req.session.message = { type: "error", text: "All fields are required." };
    return res.redirect("/signup");
  }

  // Email format validation
  if (!isValidEmail(email)) {
    req.session.message = {
      type: "error",
      text: "Please enter a valid email with a 2–4 letter domain (e.g., .com, .net, .org)."
    };
    return res.redirect("/signup");
  }

  // Strong password validation
  if (!isStrongPassword(password)) {
    req.session.message = {
      type: "error",
      text: "Password must be 8+ chars, include 1 uppercase letter, 1 number, and 1 special character."
    };
    return res.redirect("/signup");
  }

  // Duplicate user check
  if (findByEmail(email) || findByUsername(username)) {
    req.session.message = {
      type: "error",
      text: "Username or email already exists."
    };
    return res.redirect("/signup");
  }

  // Create user
  const newUser = await createUser(username, email, password);
  req.session.user = newUser;

  req.session.message = { type: "success", text: "Account created successfully!" };
  return res.redirect("/landing");
});

// -----------------------------
// Login
// -----------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = findByEmail(email);
  if (!user) {
    req.session.message = { type: "error", text: "Invalid email or password." };
    return res.redirect("/login");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    req.session.message = { type: "error", text: "Invalid email or password." };
    return res.redirect("/login");
  }

  req.session.user = user;
  req.session.message = { type: "success", text: "Login successful!" };
  return res.redirect("/landing");
});

// -----------------------------
// Logout
// -----------------------------
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("Error logging out.");

    // Pass message via query string
    res.redirect("/?message=You%20have%20been%20logged%20out&type=success");
  });
});

module.exports = router;
