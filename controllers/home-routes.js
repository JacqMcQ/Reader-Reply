const router = require("express").Router();

// Render the landingpage as the main page
router.get("/", (req, res) => {
  res.render("landing", { title: "Reader-Reply" });
});

// Render the login page
router.get("/login", (req, res) => {
  res.render("login", { title: "Log In" }); 
});

// Render the signup page
router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" }); 
});

module.exports = router;
