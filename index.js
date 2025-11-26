// Description: Main application entry point for user management system
// Author: Brandon Maloney & SD 14
// Date: 2025-11-23

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// -----------------------------
// Session Setup
// -----------------------------
app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

// -----------------------------
// Parsers
// -----------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -----------------------------
// Static Files
// -----------------------------
app.use(express.static("public"));

// -----------------------------
// Global Locals (NO clearing here)
// -----------------------------
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.message = req.session.message || null;
  next();
});

// -----------------------------
// EJS Setup
// -----------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----------------------------
// Routes
// -----------------------------
app.use("/", require("./routes/home"));
app.use("/", require("./routes/auth"));

// -----------------------------
// Server Start
// -----------------------------
module.exports = app;

if (require.main === module) {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
}
