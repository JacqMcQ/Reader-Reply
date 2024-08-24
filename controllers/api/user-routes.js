const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");
const bcrypt = require("bcrypt");

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
    const { username, email, password } = req.body;
    const dbUserData = await User.create({ username, email, password });
    console.log("New User Created:", dbUserData);
    saveSession(req, dbUserData, res, "User created successfully");
  } catch (err) {
    handleError(res, err);
  }
});

// Route to update the user's password
router.put("/change-password", withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const { password } = req.body;

        if (!password) {
            res.status(400).json({ message: "Password is required." });
            return;
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        const updatedUser = await User.update(
            { password: hashedPassword },
            {
                where: {
                    id: userId,
                },
            }
        );

        if (updatedUser[0] === 0) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update password." });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
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
