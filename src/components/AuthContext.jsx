/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This file defines a context and provider for managing user authentication in the application. 
 *    It uses Firebase Authentication to monitor and provide the current user's authentication state 
 *    throughout the app.
 */

import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create a context for authentication
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const auth = getAuth();
    
    // Listen for changes to the authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Set user to null if not logged in
      }
      setLoading(false); 
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
