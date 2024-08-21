// Create a new router instance
const router = require("express").Router();

// Import API routes
const apiRoutes = require("./api");

// Import home page routes
const homeRoutes = require("./home-routes.js");

// Use home routes for the root path
router.use("/", homeRoutes);

// Use API routes for paths starting with "/api"
router.use("/api", apiRoutes);

// Export the router
module.exports = router;
