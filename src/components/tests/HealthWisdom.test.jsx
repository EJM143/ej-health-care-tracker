/**
 *    Name: Edale Miguel
 *    Date: December 3, 2024
 * 
 *    These tests ensure the correct behavior of the HealthWisdom component.
 *    It verifies that the component handles loading, successful API responses, 
 *    and errors properly. 
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HealthWisdom from '../HealthWisdom.jsx';

global.fetch = jest.fn();

describe('HealthWisdom Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('displays loading message when fetching advice', async () => {
        fetch.mockResolvedValueOnce({
            json: () => new Promise((resolve) => setTimeout(() => resolve({ slip: { advice: 'Stay hydrated!' } }), 500)),
        });

        render(<HealthWisdom />);

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('displays advice when the API request is successful', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ slip: { advice: 'Exercise regularly!' } }),
        });

        render(<HealthWisdom />);

        await waitFor(() => expect(screen.getByText('Exercise regularly!')).toBeInTheDocument());

        expect(screen.getByRole('button', { name: /Get New Advice/i })).toBeInTheDocument();
    });

    test('displays error message when the API request fails', async () => {
        fetch.mockRejectedValueOnce(new Error('API failed'));

        render(<HealthWisdom />);

        await waitFor(() => expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument());
    });

    test('fetches new advice when the button is clicked', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ slip: { advice: 'Get enough sleep!' } }),
        });

        render(<HealthWisdom />);

        await waitFor(() => expect(screen.getByText('Get enough sleep!')).toBeInTheDocument());

        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ slip: { advice: 'Eat a balanced diet!' } }),
        });

        fireEvent.click(screen.getByRole('button', { name: /Get New Advice/i }));

        await waitFor(() => expect(screen.getByText('Eat a balanced diet!')).toBeInTheDocument());
    });
});
