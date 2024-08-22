module.exports = (req, res, next) => {
  if (req.session.loggedIn) {
    // User is authenticated, proceed to the next middleware or route handler
    return next();
  }
  // User is not authenticated, redirect to login page or handle unauthorized access
  res.redirect("/login");
};
