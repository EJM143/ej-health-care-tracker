/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains a test for the FunZonePage component. It uses Jest and React Testing Library to 
 *    verify that the "Joke of the Day" heading is rendered correctly. The FunZone component is mocked 
 *    to isolate the test and focus on the page structure.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import FunZonePage from '../FunZonePage.jsx'; 

jest.mock('../../components/FunZone', () => {
  return jest.fn(() => <div>Mocked FunZone Component</div>);  
});

describe('FunZonePage', () => {
  test('renders the "Joke of the Day" heading', () => {
    render(<FunZonePage />);

    const headingElement = screen.getByText(/Joke of the Day/i);
    expect(headingElement).toBeInTheDocument();
  });
});
