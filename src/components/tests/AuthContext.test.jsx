/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains tests for the AuthContext component using Jest and React Testing Library. 
 *    It verifies the behavior of the context when a user is authenticated, not authenticated, 
 *    and when in a loading state. The Firebase authentication functions are mocked to simulate 
 *    different auth states without making real API calls.
 */


import React, { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../AuthContext.jsx';
import { onAuthStateChanged } from 'firebase/auth';

// Mock the Firebase Authentication
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

// Create a component to consume the AuthContext
const ConsumerComponent = () => {
  const { user } = useContext(AuthContext);
  return <div>{user ? `Hello, ${user.email}` : 'No user logged in'}</div>;
};

describe('AuthContext', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = { email: 'test@example.com' };
  });

  test('should provide user when authenticated', async () => {
    onAuthStateChanged.mockImplementationOnce((auth, callback) => {
      callback(mockUser); 
      return jest.fn(); 
    });

    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Hello, ${mockUser.email}`)).toBeInTheDocument();
    });
  });

  test('should provide null user when not authenticated', async () => {
    onAuthStateChanged.mockImplementationOnce((auth, callback) => {
      callback(null); 
      return jest.fn(); 
    });

    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      // Check if no user is logged in and the fallback message is displayed
      expect(screen.getByText('No user logged in')).toBeInTheDocument();
    });
  });

  test('should show loading initially', () => {
    // Mock the Firebase auth state to simulate a loading state
    onAuthStateChanged.mockImplementationOnce((auth, callback) => {
      // Simulate loading without providing a user
      return jest.fn(); 
    });

    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
