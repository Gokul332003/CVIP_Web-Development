const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const shortid = require('shortid');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

const generateShortCode = () => shortid.generate();

// In-memory storage for URL mapping (replace with a database in a production environment)
const urlMapping = {};

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Shorten a URL
app.post('/api/shorten', (req, res) => {
  const { longUrl } = req.body;

  // Check if the long URL is valid (you can add more validation)
  if (!isValidUrl(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Generate a unique short code
  const shortCode = generateShortCode();

  // Store the mapping of short code to long URL
  urlMapping[shortCode] = longUrl;

  // Construct the shortened URL
  const shortenedUrl = `http://localhost:5000/${shortCode}`;

  res.json({ shortUrl: shortenedUrl });
});


// Redirect to the original URL
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const longUrl = urlMapping[shortCode];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: 'Short URL not found' });
  }
});

// Helper function to validate URLs
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
