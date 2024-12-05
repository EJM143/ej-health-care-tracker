/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component displays a random meme fetched from an external API.
 *    It allows users to view the meme and fetch a new one. It provides an interactive way 
 *    for users to enjoy a new meme each time they click the button.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'; 

function RandomMeme() {
  // Store the meme, loading state, and errors
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch a meme from the API
  const fetchMeme = async () => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      
      // Check if API response is successful
      if (response.data.success) {
        const memes = response.data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        setMeme(randomMeme);
      } else {
        throw new Error('Unable to fetch memes.');
      }
    } catch (err) {
      setError('Failed to load meme. Please try again.');
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    fetchMeme(); 
  }, []);

  return (
    <div className="meme-container">
      <h2 className="meme-header">Random Meme</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="meme-display">
          <img 
            src={meme.url} 
            alt={meme.name} 
            className="meme-image" 
            style={{ width: '100%', height: 'auto' }} 
          />
          <p className="meme-name">{meme.name}</p>
        </div>
      )}

      {/* Button to fetch a new meme */}
      <div className="button-container">
        <button className="new-joke-button" onClick={fetchMeme}>Get New Meme</button>
      </div>
    </div>
  );
}

export default RandomMeme;
