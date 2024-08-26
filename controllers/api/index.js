// Import required modules and related routes
const router = require("express").Router();
const userRoutes = require("./user-routes");
const writtenWorksRoutes = require("./written-works-routes");
const quoteRoutes = require("./quote-routes");
const captchaRoutes = require("./captcha-routes");
const commentRoutes = require("./comment-routes");
const bookRoutes = require("./book-routes");

// Define routes
router.use("/quotes", quoteRoutes);
router.use("/users", userRoutes);
router.use("/users/login", userRoutes);
router.use("/writtenWorks", writtenWorksRoutes);
router.use("/captcha", captchaRoutes);
router.use("/comments", commentRoutes);
router.use("/books", bookRoutes);

module.exports = router;
