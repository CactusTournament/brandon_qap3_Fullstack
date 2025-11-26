const bcrypt = require("bcrypt");
const {
  findByEmail,
  findByUsername,
  createUser
} = require("../models/userModel");

// -----------------------------
// SIGNUP
// -----------------------------
async function signup(req, res) {
  const { username, email, password } = req.body;

  // Missing fields
  if (!username || !email || !password) {
    req.session.message = {
      type: "error",
      text: "All fields are required."
    };
    return res.redirect("/signup");
  }

  // Password length check
  if (password.length < 8) {
    req.session.message = {
      type: "error",
      text: "Password must be at least 8 characters."
    };
    return res.redirect("/signup");
  }

  // Email already exists
  if (findByEmail(email)) {
    req.session.message = {
      type: "error",
      text: "Email is already registered."
    };
    return res.redirect("/signup");
  }

  // Username already exists
  if (findByUsername(username)) {
    req.session.message = {
      type: "error",
      text: "Username is already taken."
    };
    return res.redirect("/signup");
  }

  // Create user
  await createUser(username, email, password);

  req.session.message = {
    type: "success",
    text: "Account created! You can now log in."
  };

  res.redirect("/login");
}

// -----------------------------
// LOGIN
// -----------------------------
async function login(req, res) {
  const { email, password } = req.body;
  const user = findByEmail(email);

  // User not found
  if (!user) {
    req.session.message = {
      type: "error",
      text: "Invalid email or password."
    };
    return res.redirect("/login");
  }

  // Incorrect password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    req.session.message = {
      type: "error",
      text: "Invalid email or password."
    };
    return res.redirect("/login");
  }

  // Log in user
  req.session.user = user;
  req.session.message = {
    type: "success",
    text: `Welcome back, ${user.username}!`
  };

  res.redirect("/landing");
}

// -----------------------------
// LOGOUT
// -----------------------------
function logout(req, res) {
  // Save message before destroying session
  const msg = {
    type: "success",
    text: "You have been logged out."
  };

  req.session.destroy(() => {
    // Restore message AFTER destroying session
    req.session = null;
    res.locals.message = msg;

    // New session just for message
    // (Safest method)
    res.redirect("/?logout=1");
  });
}

module.exports = {
  signup,
  login,
  logout
};
