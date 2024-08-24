const router = require("express").Router();
const { User, WrittenWork, Comment } = require("../models");

// Helper function to check if user is logged in
function requireLogin(req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  if (!req.session.user_id) {
    return res
      .status(400)
      .json({ error: "User ID is not defined in session." });
  }
  next();
}

// Render homepage
router.get("/", (req, res) => {
  try {
    res.render("homepage", {
      isHomepage: true,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render dashboard
router.get("/dashboard", requireLogin, async (req, res) => {
  try {
    const writtenWorks = await WrittenWork.findAll({
      where: { userId: req.session.user_id },
    });
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      writtenWorks: writtenWorks.map((work) => work.get({ plain: true })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Render profile
router.get("/profile", requireLogin, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.render("profile", {
      loggedIn: req.session.loggedIn,
      ...user.get({ plain: true }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Render discover page
router.get("/discover", requireLogin, async (req, res) => {
  try {
    const works = await WrittenWork.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });

    res.render("discover", {
      loggedIn: req.session.loggedIn,
      works: works.map((work) => work.get({ plain: true })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render editor page
router.get("/editor", requireLogin, async (req, res) => {
  try {
    const { id: workId } = req.query;
    let workData = {};

    if (workId) {
      const work = await WrittenWork.findOne({
        where: { id: workId, userId: req.session.user_id },
      });
      workData = work ? work.get({ plain: true }) : {};
    }

    res.render("editor", {
      loggedIn: req.session.loggedIn,
      work: workData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve work." });
  }
});

//Render story page
router.get("/story", requireLogin, async (req, res) => {
  try {
    const { id: workId } = req.query;
    let workData = {};

    if (workId) {
      const work = await WrittenWork.findOne({
        where: { id: workId },
        include: [
          { model: WrittenWork, as: "OriginalWork", attributes: ["title"] },
          { model: User, attributes: ["username"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });

      if (work) {
        workData = work.get({ plain: true });
      } else {
        return res.status(404).json({ error: "Work not found." });
      }
    } else {
      return res.status(400).json({ error: "No work ID provided." });
    }

    res.render("story", {
      loggedIn: req.session.loggedIn,
      work: workData,
    });
  } catch (err) {
    console.error("Error in /story route:", err); // Log the actual error
    res.status(500).json({ error: "Failed to retrieve work." });
  }
});

// Render signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("signup");
});

// Render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

// Handle logout
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out." });
      }
      res.redirect("/");
    });
  } else {
    res.redirect("/login"); // Redirect to login page if not logged in
  }
});

module.exports = router;