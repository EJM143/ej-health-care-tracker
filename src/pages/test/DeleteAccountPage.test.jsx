/**
 *    Name: Edale Miguel
 *    Date: December 4, 2028
 * 
 *    This is a functional component that allows users to confirm and delete their accounts. 
 *    It provides a clear warning about the consequences of deletion, and users can either proceed 
 *    with the deletion or cancel the action. The interface is interactive, displaying loading 
 *    feedback during the deletion process and error messages if the process fails.
 */

import React from 'react'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DeleteAccountPage from '../DeleteAccountPage.jsx';
import * as firebaseFunctions from '../../firebaseFunctions.js';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../firebaseFunctions.js');

describe('DeleteAccountPage', () => {
  const mockNavigate = jest.fn(); // Mocking navigate

  beforeEach(() => {

    jest.clearAllMocks();

    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders the delete account page correctly', () => {
    render(
      <Router>
        <DeleteAccountPage />
      </Router>
    );

    expect(screen.getByText('Confirm Account Deletion')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete your account? This action cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('Yes, Delete My Account')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('handles successful account deletion and redirects', async () => {

    firebaseFunctions.deleteAccount.mockResolvedValueOnce();

    render(
      <Router>
        <DeleteAccountPage />
      </Router>
    );

    const deleteButton = screen.getByText('Yes, Delete My Account');

    fireEvent.click(deleteButton);

    expect(screen.getByText('Deleting...')).toBeInTheDocument();
    expect(deleteButton).toBeDisabled(); // Check if button is disabled

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/register');
    });

    expect(screen.queryByText('Deleting...')).not.toBeInTheDocument();
  });

  test('shows error message when deletion fails', async () => {
    firebaseFunctions.deleteAccount.mockRejectedValueOnce(new Error('Failed'));

    render(
      <Router>
        <DeleteAccountPage />
      </Router>
    );

    const deleteButton = screen.getByText('Yes, Delete My Account');

    fireEvent.click(deleteButton);

    expect(screen.getByText('Deleting...')).toBeInTheDocument();
    expect(deleteButton).toBeDisabled(); // Check if button is disabled

    await waitFor(() => {
      expect(screen.getByText('Failed to delete account. Please try again.')).toBeInTheDocument();
    });

    expect(screen.queryByText('Deleting...')).not.toBeInTheDocument();
  });

  test('clicking the cancel button navigates to the home page', () => {
    render(
      <Router>
        <DeleteAccountPage />
      </Router>
    );

    const cancelButton = screen.getByText('Cancel');

    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
