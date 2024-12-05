/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component displays the "Random Advise" page of the application. 
 *    This page contains interactive content for users to engage with.
 */

import React from 'react';
import HealthWisdom from '../components/HealthWisdom'; 
import '../styles/App.css'; 

function HealthWisdomPage() {
  return (
    <div className="fun-zone-page">
      <h2>Health Wisdom</h2>
      
      <HealthWisdom />
    </div>
  );
}

export default HealthWisdomPage;