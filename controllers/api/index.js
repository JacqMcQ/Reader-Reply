
const router = require("express").Router();
const userRoutes = require("./user-routes");
const writtenWorksRoutes = require("./written-works-routes");
const quoteRoutes = require("./quote-routes");

router.use("/quotes", quoteRoutes);
router.use("/users", userRoutes);
router.use("/users/login", userRoutes);
router.use("/writtenWorks", writtenWorksRoutes);

module.exports = router;
