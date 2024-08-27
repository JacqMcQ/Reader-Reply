const router = require("express").Router();
const { User, WrittenWork, Comment } = require("../models");
const withAuth = require("../utils/auth");

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
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const writtenWorks = await WrittenWork.findAll({
      where: { userId: userId },
    });

    const commentedWorks = await WrittenWork.findAll({
      include: [
        {
          model: Comment,
          where: { userId: userId },
          required: true,
        },
      ],
    });

    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      dashboardActive: true, // Active page indicator
      writtenWorks: writtenWorks.map((work) => work.get({ plain: true })),
      commentedWorks: commentedWorks.map((work) => work.get({ plain: true })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Render profile
router.get("/profile", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.render("profile", {
      loggedIn: req.session.loggedIn,
      profileActive: true, // Active page indicator
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
      works: userProfile.writtenWorks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load author profile." });
  }
});

// Render discover page with only published works
router.get("/discover", withAuth, async (req, res) => {
  try {
    // Fetch published works along with associated comments and users
    const works = await WrittenWork.findAll({
      where: {
        isPublished: true,
      },
      include: [
        {
          model: Comment,
          include: [User], // Include user data in comments
        },
        {
          model: User,
          attributes: ["id", "username"], // Include user id and username
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Convert Sequelize objects to plain JavaScript objects
    const worksData = works.map((work) => work.get({ plain: true }));

    // Render the discover page with works data
    res.render("discover", {
      works: worksData,
      loggedIn: req.session.loggedIn,
      discoverActive: true, // Active page indicator
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render editor page
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
// Render story page
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

// Render signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("signup");
});

// Render login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

// Render logout
router.get("/logout", withAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out." });
    }
    res.redirect("/");
  });
});

// Render Terms of Use and License page
router.get("/terms", (req, res) => {
  try {
    res.render("terms");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
