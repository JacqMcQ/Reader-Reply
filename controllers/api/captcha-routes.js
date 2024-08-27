const router = require("express").Router();

// Route for signup page captcha generation
router.get("/signup", async (req, res) => {
  try {
    // Dynamically import the ES module for captcha generation
    const { default: generate } = await import("vanilla-captcha");

    const charAmount = 5;
    const { answer, captcha } = await generate(charAmount);

    req.session.captcha = answer;
    res.set("Content-Type", "image/png");
    res.send(captcha);
  } catch (err) {
    console.error("Error generating captcha:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route for login page captcha generation
router.get("/login", async (req, res) => {
  try {
    // Dynamically import the ES module for captcha generation
    const { default: generate } = await import("vanilla-captcha");

    const charAmount = 5;
    const { answer, captcha } = await generate(charAmount);

    req.session.captcha = answer;
    res.set("Content-Type", "image/png");
    res.send(captcha);
  } catch (err) {
    console.error("Error generating captcha:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
