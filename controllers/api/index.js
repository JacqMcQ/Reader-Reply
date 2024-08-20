const router = require("express").Router();
const userRoutes = require("./user-routes"); // Import the user routes

router.use("/users", userRoutes); // Use the user routes

module.exports = router;
