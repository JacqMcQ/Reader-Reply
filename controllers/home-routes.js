const router = require("express").Router();
const withAuth = require("../utils/auth");

// Render the landing page as the main page
router.get("/", (req, res) => {
  res.render("landing", { title: "Reader-Reply" });
});

// Render the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Render the signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

// Render the dashboard page, only accessible to logged-in users
router.get("/dashboard", withAuth, (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

module.exports = router;
