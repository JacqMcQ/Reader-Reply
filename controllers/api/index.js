// controllers/api/index.js
const router = require("express").Router();
const userRoutes = require("./user-routes");
const writtenWorksRoutes = require("./written-works-routes");

router.use("/users", userRoutes);
router.use("/writtenWorks", writtenWorksRoutes);

module.exports = router;
