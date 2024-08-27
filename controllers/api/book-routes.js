const router = require('express').Router();
const axios = require("axios");

// Access the API key from ENV file
const API_KEY = process.env.NYT_API_KEY;

// Route to get Best sellers list from NY times
router.get('/books', async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/overview.json",
      {
        params: { "api-key": API_KEY },
      }
    );

    res.json(response.data.results.lists); 
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).json({ error: 'Failed to fetch best sellers' });
  }
});

module.exports = router;