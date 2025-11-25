const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../models/users");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");

// Home
router.get("/", (req, res) => {
  res.render("home", { user: req.session.user || null });
});

// Landing page
router.get("/landing", ensureAuthenticated, (req, res) => {
  const user = req.session.user;
  if (user.role === "admin") {
    return res.render("admin", { users: getAllUsers(), user });
  } else {
    return res.render("landing", { user });
  }
});

// Optional separate admin route
router.get("/admin", ensureAdmin, (req, res) => {
  res.render("admin", { users: getAllUsers(), user: req.session.user });
});

module.exports = router;
