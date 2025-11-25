// middleware/auth.js
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/");
}

function ensureAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.redirect("/landing");
}

function ensureGuest(req, res, next) {
  if (!req.session.user) {
    return next();
  }
  res.redirect("/landing");
}

module.exports = { ensureAuthenticated, ensureAdmin, ensureGuest };
