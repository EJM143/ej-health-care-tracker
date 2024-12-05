/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This file serves as the main entry point for the React application, responsible for rendering the app layout 
 *    and managing user authentication. It includes routing logic that conditionally renders different pages based 
 *    on the user's authentication status. The app ensures smooth navigation by adjusting routes based on the 
 *    user's authentication state, and it handles invalid URLs by showing a "Not Found" page for a seamless experience.
 */

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AppointmentsPage from './pages/AppointmentsPage';
import MedicationsPage from './pages/MedicationsPage';
import HealthLogsPage from './pages/HealthLogsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import HelloMessage from './components/HelloMessage';
import FunZonePage from './pages/FunZonePage'; 
import RandomMeme from './components/RandomMeme'; 
import HealthWisdom from './components/HealthWisdom'; 
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import DeleteAccountPage from "./pages/DeleteAccountPage";
import './styles/App.css';



function App() {
  // State to track the authenticated user
  const [user, setUser] = useState(null);
  // State to manage visibility of the popup
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the authenticated user
        setIsVisible(true); // Show popup
        setTimeout(() => setIsVisible(false), 3000); // Hide popup after 3 seconds
      } else {
        setUser(null); // Clear the user state
        setIsVisible(false); // Hide popup
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  useEffect(() => {
    // Load data from localStorage (for persistent state)
    if (user) {
      const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const medications = JSON.parse(localStorage.getItem('medications')) || [];
      const healthLogs = JSON.parse(localStorage.getItem('healthLogs')) || [];

      console.log('Loaded localStorage data', { appointments, medications, healthLogs });
    }
  }, [user]);

  return (
    <div>
      <Header />
      {/* Show popup message */}
      <HelloMessage isVisible={isVisible} />

      {/* Conditional rendering */}
      {user ? (
        // Routes for authenticated users
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fun-zone" element={<FunZonePage />} />
          <Route path="/meme-container" element={<RandomMeme />} />
          <Route path="/advise-api" element={<HealthWisdom />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/health-logs" element={<HealthLogsPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        // Routes for unauthenticated users
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<LoginPage />} />
          <Route path="/fun-zone" element={<FunZonePage />} />
          <Route path="/meme-container" element={<RandomMeme />} />
          <Route path="/advise-api" element={<HealthWisdom />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
