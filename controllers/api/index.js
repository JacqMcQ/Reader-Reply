
const router = require("express").Router();
const userRoutes = require("./user-routes");
const writtenWorksRoutes = require("./written-works-routes");
const quoteRoutes = require("./quote-routes");
const captchaRoutes = require("./captcha-routes");

router.use("/quotes", quoteRoutes);
router.use("/users", userRoutes);
router.use("/writtenWorks", writtenWorksRoutes);
router.use("/captcha", captchaRoutes);

module.exports = router;
