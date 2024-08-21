// Create a new router instance
const router = require("express").Router();

// Import the User model
const { User } = require("../models");

// Route to render the homepage
router.get("/", async (req, res) => {
  try {
    // Render the homepage template with the isHomepage flag set to true
    res.render("homepage", {
      isHomepage: true,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err); // Log any errors
    res.status(500).json(err); // Respond with a server error
  }
});

// Route to render the dashboard
router.get("/dashboard", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }

    if (!req.session.user_id) {
      throw new Error("User ID is not defined in the session.");
    }

    // Render the dashboard template, passing in the login status
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// Route to render the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Route to handle logout
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out." });
      }
      res.redirect("/"); // Redirect to homepage
    });
  } else {
    res.status(404).json({ error: "User not logged in." });
  }
});

// Export the router
module.exports = router;
