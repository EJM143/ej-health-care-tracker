/**
 *    Name: Edale Miguel
 *    Date: December 3, 2024
 * 
 *    These tests check the visibility of the greeting message in the HelloMessage component.
 *    It ensures that the message is displayed when the `isVisible` prop is true and hidden when false.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloMessage from '../HelloMessage.jsx'; 

describe('HelloMessage Component', () => {
  test('renders the greeting message when isVisible is true', () => {
    render(<HelloMessage isVisible={true} />);

    const greetingMessage = screen.getByText("Hello, we're glad to see you!");

    expect(greetingMessage).toBeInTheDocument();
  });

  test('does not render the greeting message when isVisible is false', () => {
    render(<HelloMessage isVisible={false} />);   
    const greetingMessage = screen.queryByText("Hello, we're glad to see you!");
    expect(greetingMessage).not.toBeInTheDocument();
  });
});
