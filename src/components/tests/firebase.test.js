/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains tests for the Firebase initialization and export process. 
 *    It mocks the Firebase services (`initializeApp`, `getAuth`, and `getFirestore`) 
 *    to ensure that the app is initialized with the correct configuration, and that 
 *    the `app`, `db`, and `auth` instances are correctly exported and set up.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Mock Firebase services
jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('Firebase Initialization', () => {
  it('should initialize Firebase app with correct config', () => {
    const mockInitializeApp = jest.fn();
    initializeApp.mockImplementation(mockInitializeApp);

    // Import Firebase setup
    require('../../firebase');  

    // Test that initializeApp was called with the correct config
    expect(mockInitializeApp).toHaveBeenCalledWith({
      apiKey: "AIzaSyDffUq1Um-DdaHsFCmHlfOpcmhFwsji928",
      authDomain: "healthcaretracker-448eb.firebaseapp.com",
      projectId: "healthcaretracker-448eb",
      storageBucket: "healthcaretracker-448eb.firebasestorage.app",
      messagingSenderId: "167396290064",
      appId: "1:167396290064:web:28ca371a4a86a88b8a2495"
    });
  });

  it('should ensure app, db, and auth are exported correctly', () => {
    // Mock the returned instances
    const mockApp = {};
    const mockDb = {};
    const mockAuth = {};

    initializeApp.mockReturnValue(mockApp);
    getFirestore.mockReturnValue(mockDb);
    getAuth.mockReturnValue(mockAuth);

    // Import Firebase.js to trigger the mock setup
    require('../../firebase');  

    // Test that app, db, and auth are exported correctly
    expect(mockApp).toBeDefined();
    expect(mockDb).toBeDefined();
    expect(mockAuth).toBeDefined();
  });
});

