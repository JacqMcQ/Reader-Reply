const router = require("express").Router();


router.get("/editor", (req, res) => {
  res.render("editor");
});

module.exports = router;
