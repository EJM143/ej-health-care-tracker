/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component displays a 404 error page when a user navigates to a non-existing route.
 *    It informs the user that the requested page was not found and provides a button to redirect
 *    them back to the homepage.
 */


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const NotFoundPage = () => {
  const navigate = useNavigate();


  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-message">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      {/* Button that redirects to homepage */}
      <button className="not-found-button" onClick={handleGoHome}>Go to Homepage</button>
    </div>
  );
};

export default NotFoundPage;
