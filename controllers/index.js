// Create a new router instance
const router = require("express").Router();

// Import API routes
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const profileRoutes = require("./profile-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);

// Export the router
module.exports = router;
