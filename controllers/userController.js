const { getAllUsers } = require("../models/userModel");

function landing(req, res) {
  const user = req.session.user;

  if (user.role === "admin") {
    return res.render("admin", {
      users: getAllUsers(),
      user
    });
  }

  res.render("landing", { user });
}

module.exports = { landing };
