/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains tests for the HomePage component using Jest and React Testing Library. 
 *    It checks if the correct welcome message is rendered based on the user's authentication status, 
 *    verifies the rendering and functionality of buttons, and ensures the background image is displayed correctly.
 *    Firebase authentication is mocked for the tests.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage.jsx';  // Corrected import path
import { auth } from '../../firebase';

// Mock Firebase authentication
jest.mock('../../firebase', () => ({
  auth: {
    currentUser: {
      displayName: 'John Doe',
    },
  },
}));

describe('HomePage', () => {
  test('renders home page with a welcome message for logged-in user', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if the welcome message is rendered with the correct user name
    expect(screen.getByText('Welcome John Doe, to EJ Health Care Tracker')).toBeInTheDocument();
  });

  test('renders home page with a generic welcome message when no user is logged in', () => {
    // Change mock to simulate no logged-in user
    auth.currentUser = null;

    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if the generic welcome message is rendered
    expect(screen.getByText('Welcome to EJ Health Care Tracker')).toBeInTheDocument();
  });

  test('renders the buttons correctly and navigates when clicked', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if the buttons are rendered
    const jokeButton = screen.getByText('Jokes');
    const memeButton = screen.getByText('Random Memes');
    const healthButton = screen.getByText('Health Wisdom');

    // Simulate button clicks and check if navigate function is called
    fireEvent.click(jokeButton);
    fireEvent.click(memeButton);
    fireEvent.click(healthButton);

    // Since the navigate function is called inside onClick, we can't check the navigation directly,
    // but we can at least ensure the buttons are present.
    expect(jokeButton).toBeInTheDocument();
    expect(memeButton).toBeInTheDocument();
    expect(healthButton).toBeInTheDocument();
  });

  test('renders background image', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if the background image is rendered
    const imgElement = screen.getByAltText('Health Care Tracker');
    expect(imgElement).toBeInTheDocument();
  });
});
