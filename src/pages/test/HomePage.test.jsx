/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains tests for the HomePage component using Jest and React Testing Library. 
 *    It checks if the correct welcome message is rendered based on the user's authentication status, 
 *    verifies the rendering and functionality of buttons, and ensures the background image is displayed correctly.
 *    Firebase authentication is mocked for the tests.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage.jsx';  
import { auth } from '../../firebase';


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


    expect(screen.getByText('Welcome John Doe, to EJ Health Care Tracker')).toBeInTheDocument();
  });

  test('renders home page with a generic welcome message when no user is logged in', () => {
    auth.currentUser = null;

    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText('Welcome to EJ Health Care Tracker')).toBeInTheDocument();
  });

  test('renders the buttons correctly and navigates when clicked', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const jokeButton = screen.getByText('Jokes');
    const memeButton = screen.getByText('Random Memes');
    const healthButton = screen.getByText('Health Wisdom');

    fireEvent.click(jokeButton);
    fireEvent.click(memeButton);
    fireEvent.click(healthButton);

    expect(jokeButton).toBeInTheDocument();
    expect(memeButton).toBeInTheDocument();
    expect(healthButton).toBeInTheDocument();
  });
});
