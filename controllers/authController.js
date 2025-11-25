const bcrypt = require("bcrypt");
const {
  findByEmail,
  findByUsername,
  createUser
} = require("../models/userModel");

async function signup(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.render("signup", { error: "All fields are required.", user: req.session.user });
  }

  if (password.length < 8) {
    return res.render("signup", { error: "Password must be at least 8 characters.", user: req.session.user });
  }

  if (findByEmail(email)) {
    return res.render("signup", { error: "Email already in use.", user: req.session.user });
  }

  if (findByUsername(username)) {
    return res.render("signup", { error: "Username already in use.", user: req.session.user });
  }

  await createUser(username, email, password);

  res.redirect("/login");
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = findByEmail(email);

  if (!user) {
    return res.render("login", { error: "Invalid email or password.", user: null });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.render("login", { error: "Invalid email or password.", user: null });
  }

  req.session.user = user;
  res.redirect("/landing");
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

module.exports = {
  signup,
  login,
  logout
};
