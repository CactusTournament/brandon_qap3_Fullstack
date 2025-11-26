const { getAllUsers } = require("../models/userModel");

function landing(req, res) {
  const user = req.session.user;

  // If not logged in
  if (!user) {
    req.session.message = {
      type: "error",
      text: "You must be logged in to access that page."
    };
    return res.redirect("/login");
  }

  // Admin view
  if (user.role === "admin") {
    return res.render("admin", {
      users: getAllUsers(),
      user
    });
  }

  // Regular user landing
  res.render("landing", { user });
}

module.exports = { landing };
