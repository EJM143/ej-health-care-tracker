/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component displays the "Random Meme" page of the application. 
 *    This page contains interactive content for users to engage with.
 */

import React from 'react';
import RandomMeme from '../components/RandomMeme'; 
import '../styles/App.css'; 

function RandomMemePage() {
  return (
    <div className="fun-zone-page">
      <h2>Random Meme</h2>

      <RandomMeme />
    </div>
  );
}

export default RandomMemePage;
