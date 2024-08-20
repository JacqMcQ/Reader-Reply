const router = require("express").Router();
const withAuth = require("../utils/auth");

// Render the dashboard page, only accessible to logged-in users
router.get("/dashboard", withAuth, (req, res) => {
  // You can add more complex logic here if needed, like fetching data from the database
  res.render("dashboard", { title: "Dashboard" });
});

module.exports = router;
