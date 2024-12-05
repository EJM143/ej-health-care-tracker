/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This file defines the HomePage component, which displays a welcome message and provides navigation 
 *    options to various features like jokes, random memes, and health wisdom. It also checks if the user is 
 *    logged in using Firebase Authentication and displays the user's name if available. The component also 
 *    imports and displays a background image and a footer.
 */

import React, { useState, useEffect } from 'react';
import background from '../assets/background.jpg';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { auth } from '../firebase'; 
import '../styles/App.css';

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user 
    const user = auth.currentUser;

    if (user && user.displayName) {
      // If the user is logged, display name
      setUserName(user.displayName);
    } else {
      // If the user is not logged in, no name
      setUserName('');
    }
  }, []); 

  return (
    <div className="home-page">
    
      <h1>{userName ? `Welcome ${userName}, to EJ Health Care Tracker` : 'Welcome to EJ Health Care Tracker'}</h1>
      <p>Manage your appointments, medications, and health logs easily!</p>


      <div className="button-row">
        <button className="fun-zone-button" onClick={() => navigate('/fun-zone')}>Jokes</button>
        <button className="fun-zone-button" onClick={() => navigate('/meme-container')}>Random Memes</button>
        <button className="fun-zone-button" onClick={() => navigate('/advise-api')}>Health Wisdom</button>
      </div>

      <img src={background} alt="Health Care Tracker" className="home-image" />
      
      <div>
      <Footer />
    </div>
    </div>
  );
};

export default HomePage;
