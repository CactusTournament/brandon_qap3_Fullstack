app.use((req, res, next) => {
  res.locals.user = req.session.user || null;

  res.locals.message = req.session.message || null;
  req.session.message = null;

  next();
});
