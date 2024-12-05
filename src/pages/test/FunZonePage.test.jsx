/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains a test for the FunZonePage component. It uses Jest and React Testing Library to 
 *    verify that the "Joke of the Day" heading is rendered correctly. The FunZone component is mocked 
 *    to isolate the test and focus on the page structure.
 */

import { render, screen } from '@testing-library/react';
import FunZonePage from '../FunZonePage.jsx'; // Correct path for FunZonePage.jsx

// Mock the FunZone component to focus the test on the page structure
jest.mock('../../components/FunZone', () => {
  return jest.fn(() => <div>Mocked FunZone Component</div>);  // Return mocked content here
});

describe('FunZonePage', () => {
  test('renders the "Joke of the Day" heading', () => {
    render(<FunZonePage />);
    
    // Check if the heading "Joke of the Day" is in the document
    const headingElement = screen.getByText(/Joke of the Day/i);
    expect(headingElement).toBeInTheDocument();
  });
});
