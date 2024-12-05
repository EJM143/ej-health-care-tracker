/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 *    
 *    This is a stateless functional component that displays a popup message.
 *    Its a greeting message "Hello, we're glad to see you!" is rendered. 
 *    It does not manage any internal state and relies solely on the received props.
 */

import React from 'react';
import '../styles/App.css';

function HelloMessage({ isVisible }) {
  return (
    isVisible && (
      <div className="popup">
        <h2>Hello, we're glad to see you!</h2>
      </div>
    )
  );
}

export default HelloMessage;