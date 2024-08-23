// Create a new router instance
const router = require("express").Router();
// Import the User model
const { User, WrittenWork } = require("../models");
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
    // Fetch the written works created by the user
    const writtenWorks = await WrittenWork.findAll({
      where: { userId: req.session.user_id }
    });
    // Pass the written works to the dashboard template
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      writtenWorks: writtenWorks.map(work => work.get({ plain: true })), // Send plain JS objects
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Route to render the profile
router.get("/profile", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
    if (!req.session.user_id) {
      throw new Error("User ID is not defined in the session.");
    }
    // Fetch the user data from the database
    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      throw new Error("User not found.");
    }
    // Render the profile template, passing in the user data
    res.render("profile", {
      loggedIn: req.session.loggedIn,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
// Route to render the discover
router.get("/discover", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
    if (!req.session.user_id) {
      throw new Error("User ID is not defined in the session.");
    }
    // Fetch the user data from the database
    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      throw new Error("User not found.");
    }
    // Render the profile template, passing in the user data
    res.render("discover", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
// Route to render the editor page
router.get("/editor", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }

    // Render the editor template
    res.render("editor", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
module.exports = router;