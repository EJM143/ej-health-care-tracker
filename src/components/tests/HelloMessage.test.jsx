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
    // Render the component with the prop 
    render(<HelloMessage isVisible={true} />);
    
    // Check if the greeting message is rendered
    const greetingMessage = screen.getByText("Hello, we're glad to see you!");
    
    // Assert that the greeting message is in the document
    expect(greetingMessage).toBeInTheDocument();
  });

  test('does not render the greeting message when isVisible is false', () => {
    // Render the component with the prop 
    render(<HelloMessage isVisible={false} />);
    
    // Check that the greeting message is not rendered
    const greetingMessage = screen.queryByText("Hello, we're glad to see you!");
    
    // Assert that the greeting message is not in the document
    expect(greetingMessage).not.toBeInTheDocument();
  });
});
