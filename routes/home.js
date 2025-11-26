// routes/home.js
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");
const { getAllUsers } = require("../models/users");

// Home
router.get("/", (req, res) => {
  const msg = req.query.message
    ? { type: req.query.type || "success", text: req.query.message }
    : req.session.message || null;

  req.session.message = null;

  res.render("home", { message: msg });
});


// Landing
router.get("/landing", ensureAuthenticated, (req, res) => {
  const user = req.session.user;

  if (user.role === "admin") {
    return res.render("admin", { users: getAllUsers(), user });
  }

  return res.render("landing", { user });
});

// Admin page
router.get("/admin", ensureAdmin, (req, res) => {
  res.render("admin", { users: getAllUsers(), user: req.session.user });
});

module.exports = router;
