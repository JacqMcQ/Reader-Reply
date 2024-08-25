const router = require("express").Router();
const userRoutes = require("./user-routes");
const writtenWorksRoutes = require("./written-works-routes");
const quoteRoutes = require("./quote-routes");
const profileRoutes = require("./profile-routes");
const commentRoutes = require("./comment-routes");

router.use("/quotes", quoteRoutes);
router.use("/users", userRoutes);
router.use("/writtenWorks", writtenWorksRoutes);
router.use("/profile", profileRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
