// Create a new router instance
const router = require("express").Router();

// Import API routes
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// Export the router
module.exports = router;
