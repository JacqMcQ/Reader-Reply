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

router.put("/save-bio", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const { bio } = req.body;

    if (bio.length > 500) {
      return res
        .status(400)
        .json({ message: "Bio cannot exceed 500 characters." });
    }

    const updatedUser = await User.update(
      { bio },
      {
        where: {
          id: userId,
        },
      }
    );

    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Bio updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update bio." });
  }
});

// Route to update the user's password
router.put("/change-password", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both current and new passwords are required." });
    }

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current password matches
    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect current password." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.update(
      { password: hashedNewPassword },
      {
        where: {
          id: userId,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
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
