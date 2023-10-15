// src/components/LinkShortener.js
import React, { useState } from 'react';

function LinkShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showShortenedLink, setShowShortenedLink] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();
      console.log('Response from backend:', data);
      setShortUrl(data.shortUrl);
      setShowShortenedLink(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>Link Shortener</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="long-url">Enter a Long URL:</label>
        <input
          type="url"
          id="long-url"
          name="long-url"
          placeholder="https://www.example.com"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {showShortenedLink && (
        <div id="shortened-link">
          <p>Your Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default LinkShortener;
