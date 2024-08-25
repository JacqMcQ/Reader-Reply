const router = require("express").Router();
const { User } = require("../../models");

// Utility function to handle errors and responses
const handleError = (res, err, statusCode = 500) => {
  console.error(err); // Log error details
  res.status(statusCode).json({ error: err.message });
};

// Utility function to handle session saving
const saveSession = (req, user, res, successMessage, statusCode = 200) => {
  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.loggedIn = true;
    console.log("Session after operation:", req.session);
    res.status(statusCode).json({ user, message: successMessage });
  });
};

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, captcha } = req.body;

    if (captcha !== req.session.captcha) {
      return res.status(400).json({ message: "CAPTCHA verification failed." });
    }

    const dbUserData = await User.create({ username, email, password });
    console.log("New User Created:", dbUserData);
    saveSession(req, dbUserData, res, "User created successfully");
  } catch (err) {
    handleError(res, err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password, captcha } = req.body;

    if (captcha !== req.session.captcha) {
      return res.status(400).json({ message: "CAPTCHA verification failed." });
    }

    const dbUserData = await User.findOne({ where: { username } });

    if (!dbUserData || !dbUserData.checkPassword(password)) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
    }

    saveSession(req, dbUserData, res, "You are now logged in.");
  } catch (err) {
    handleError(res, err);
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((err) => {
      if (err) {
        return handleError(res, err);
      }
      res.redirect("/login"); // Redirect to the login page on successful logout
    });
  } else {
    res.redirect("/login"); // Redirect to login page if not logged in
  }
});

module.exports = router;
