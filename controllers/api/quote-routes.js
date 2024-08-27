// Import necessary modules
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route to get a random quote from the ZenQuotes API
router.get("/quote", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const quote = response.data[0];
    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch quote" });
  }
});

module.exports = router;
