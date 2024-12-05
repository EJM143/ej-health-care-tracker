/**
 *      Name: Edale Miguel
 *      Date: December 3, 2024   
 *      
 *      This file tests Firebase initialization, ensuring correct configuration and export of Firebase 
 *      services using Jest mocks. The tests verify that Firebase is initialized with the correct 
 *      configuration and that the app, db, and auth are properly exported for use in the application.
 */


jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
  }));
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
  }));
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
  }));
  jest.mock('firebase/analytics', () => ({
    getAnalytics: jest.fn(),
  }));
  
  const mockConfig = {
    apiKey: "AIzaSyA4O0m_dsJne2IIjJXRFq9x8JMJ7ryG5Nk",
    authDomain: "ej-health-care-tracker.firebaseapp.com",
    projectId: "ej-health-care-tracker",
    storageBucket: "ej-health-care-tracker.firebasestorage.app",
    messagingSenderId: "951912381162",
    appId: "1:951912381162:web:43443781e0c0f260f23593",
    measurementId: "G-2RH2LYPD13"
  };
  
  const mockApp = {};
  const mockDb = {};
  const mockAuth = {};
  const mockAnalytics = {};
  
  beforeAll(() => {
    require('firebase/app').initializeApp.mockReturnValue(mockApp);
    require('firebase/auth').getAuth.mockReturnValue(mockAuth);
    require('firebase/firestore').getFirestore.mockReturnValue(mockDb);
    require('firebase/analytics').getAnalytics.mockReturnValue(mockAnalytics);
  });
  
  describe('Firebase Initialization', () => {
    it('should initialize Firebase app with correct config', () => {
      require('../../firebase'); 
 
      const { initializeApp } = require('firebase/app');
      expect(initializeApp).toHaveBeenCalledWith(mockConfig);
    });
  
    it('should ensure app, db, and auth are exported correctly', () => {

 
      expect(app).toBe(mockApp);
      expect(db).toBe(mockDb);
      expect(auth).toBe(mockAuth);
    });
  });
  