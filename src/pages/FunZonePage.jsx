/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component displays the "Fun Zone" page of the application. 
 *    This page contains interactive content for users to engage with.
 */

import React from 'react';
import FunZone from '../components/FunZone'; 
import '../styles/App.css'; 

function FunZonePage() {
  return (
    <div className="fun-zone-page">
      <h1>Joke of the Day</h1>
      <FunZone />
    </div>
  );
}

export default FunZonePage;

