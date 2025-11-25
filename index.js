// Description: Main application file for user management system
// Author: Brandon Maloney & SD 14
// Date: 2025-11-23
const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// Session setup
app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));

// Start server
// At the end of index.js
module.exports = app;

// And optionally create a separate start script
if (require.main === module) {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}

