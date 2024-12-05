/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component displays a joke of the day fetched from an external API.
 *    It allows users to view joke and fetch a new one. It is an interactive way for users to enjoy 
 *    a new joke each time they click the button.
 */

import React, { useState, useEffect } from 'react';
import '../styles/App.css'; 

function FunZone() {
  // store the joke, load state, and errors
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch a joke from the API
  const fetchJoke = async () => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Programming?type=single'
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message); 
      }

      setJoke(data.joke); 
    } catch (err) {
      setError('Failed to fetch a joke. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  // Fetch a joke 
  useEffect(() => {
    fetchJoke(); 
  }, []);

  return (
    <div className="fun-zone">

      {loading ? (
        <div className="loading">Loading...</div>
      ) : 
      error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="joke-container">
          <p className="joke">{joke}</p>
        </div>
      )}

      {/* Button to fetch a new joke */}
      <button className="new-joke-button" onClick={fetchJoke}>Get New Joke</button>
    </div>
  );
}

export default FunZone;
