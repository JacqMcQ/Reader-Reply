const router = require("express").Router();

// Route for signup page
router.get('/signup', async (req, res) => {
    try {
      // Dynamically import the ES module
      const { default: generate } = await import('vanilla-captcha');
      
      const charAmount = 5;
      const { answer, captcha } = await generate(charAmount);
  
      req.session.captcha = answer; // Store the captcha answer in the session
      res.set('Content-Type', 'image/png'); // Set response header to image type
      res.send(captcha); // Send the captcha image as response
    } catch (err) {
      console.error('Error generating captcha:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // GET Login Page
  router.get('/login', async (req, res) => {
    try {
      // Dynamically import the ES module
      const { default: generate } = await import('vanilla-captcha');
      
      const charAmount = 5;
      const { answer, captcha } = await generate(charAmount);
  
      req.session.captcha = answer; // Store the captcha answer in the session
      res.set('Content-Type', 'image/png'); // Set response header to image type
      res.send(captcha); // Send the captcha image as response
    } catch (err) {
      console.error('Error generating captcha:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router;
