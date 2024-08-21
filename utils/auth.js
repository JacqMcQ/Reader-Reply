// Middleware to check if user is logged in
module.exports = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login"); // Redirect to login if not logged in
    return;
  }
  next(); // Proceed if logged in
};