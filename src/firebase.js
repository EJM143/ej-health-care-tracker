/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This file initializes the Firebase app and sets up Firebase Authentication and Firestore services. 
 *    It imports the necessary Firebase modules and configures them using a Firebase config object.
 *    This setup enables user authentication and data management features in the app, providing secure 
 *    access to user data and storage.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA4O0m_dsJne2IIjJXRFq9x8JMJ7ryG5Nk",
  authDomain: "ej-health-care-tracker.firebaseapp.com",
  projectId: "ej-health-care-tracker",
  storageBucket: "ej-health-care-tracker.firebasestorage.app",
  messagingSenderId: "951912381162",
  appId: "1:951912381162:web:43443781e0c0f260f23593",
  measurementId: "G-2RH2LYPD13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Firebase Authentication
const auth = getAuth(app);

// Export Firebase app, Firestore instance, and Auth instance
export { app, db, auth };

export default app;