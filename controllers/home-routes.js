const router = require("express").Router();
const { User, WrittenWork, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Render homepage (no auth required)
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

// Render dashboard (requires auth)
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Fetch works the user has written
    const writtenWorks = await WrittenWork.findAll({
      where: { userId: userId },
    });

    // Fetch works the user has commented on
    const commentedWorks = await WrittenWork.findAll({
      include: [
        {
          model: Comment,
          where: { userId: userId },
          required: true, // Only include works with comments from this user
        },
      ],
    });

    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      writtenWorks: writtenWorks.map((work) => work.get({ plain: true })),
      commentedWorks: commentedWorks.map((work) => work.get({ plain: true })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Render profile (requires auth)
router.get("/profile", withAuth, async (req, res) => {
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

// Route to render author profile page
router.get("/author/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: WrittenWork }],
    });

    if (!user) {
      return res.status(404).json({ error: "Author not found." });
    }

    const userProfile = user.get({ plain: true });

    res.render("authorProfile", {
      loggedIn: req.session.loggedIn,
      ...userProfile,
      works: userProfile.writtenWorks, // Pass the author's works to the view
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load author profile." });
  }
});

// Render discover page (requires auth)
router.get("/discover", withAuth, async (req, res) => {
  try {
    const works = await WrittenWork.findAll({
      include: [
        { model: User, attributes: ["id", "username"] }, // Ensure 'id' is included
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
          order: [["createdAt", "DESC"]],
        },
      ],
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

// Render editor page (requires auth)
router.get("/editor", withAuth, async (req, res) => {
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

// Render story page (requires auth)
router.get("/story", withAuth, async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve work." });
  }
});

// Render signup (no auth required)
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("signup");
});

// Render login (no auth required)
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

// Logout (requires auth)
router.get("/logout", withAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out." });
    }
    res.redirect("/");
  });
});

module.exports = router;
