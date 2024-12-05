/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This file initializes the React app, wraps it with a router and authentication context provider, 
 *    ensuring proper routing and user authentication management.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; 
import './styles/App.css';
import { app } from './firebase'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


