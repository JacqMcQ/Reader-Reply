
const router = require("express").Router();
const userRoutes = require("./user-routes");
const quoteRoutes = require("./quote-routes");

router.use("/quotes", quoteRoutes);
router.use("/users", userRoutes);

module.exports = router;
