/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains tests for the AppointmentsForm component using Jest and React Testing Library. 
 *    It ensures the form renders correctly, validates the form submission with appropriate data, 
 *    and checks the behavior of the delete button when an appointment is provided for editing.
 *    The `saveAppointment` function is mocked to avoid actual API calls during testing.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AppointmentsForm from '../AppointmentsForm.jsx';
import { saveAppointment } from '../../firebaseFunctions';

// Mock the saveAppointment function
jest.mock('../../firebaseFunctions', () => ({
  saveAppointment: jest.fn(),
}));

describe('AppointmentsForm', () => {
  beforeEach(() => {
    saveAppointment.mockClear();  
  });

  test('renders Appointment Form correctly', () => {
    render(<AppointmentsForm />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Appointment Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Appointment Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Doctor's Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reason for Visit/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submits the form with the correct data', async () => {
    render(<AppointmentsForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Appointment Date/i), { target: { value: '2024-12-01' } });
    fireEvent.change(screen.getByLabelText(/Appointment Time/i), { target: { value: '10:00' } });
    fireEvent.change(screen.getByLabelText(/Doctor's Name/i), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText(/Reason for Visit/i), { target: { value: 'Checkup' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the mock saveAppointment function to be called
    await waitFor(() => expect(saveAppointment).toHaveBeenCalledWith({
      appointmentDate: '2024-12-01',
      appointmentTime: '10:00',
      doctorName: 'Dr. Smith',
      appointmentReason: 'Checkup',
    }));
  });

  test('calls handleDelete if appointmentToEdit is provided', () => {
    const mockHandleDelete = jest.fn();
    const appointmentToEdit = {
      appointmentDate: '2024-12-01',
      appointmentTime: '10:00',
      doctorName: 'Dr. Smith',
      appointmentReason: 'Checkup',
    };

    render(<AppointmentsForm appointmentToEdit={appointmentToEdit} handleDelete={mockHandleDelete} />);

    // Simulate clicking the delete button
    fireEvent.click(screen.getByRole('button', { name: /delete appointment/i }));

    // Check if the mock handleDelete was called
    expect(mockHandleDelete).toHaveBeenCalledWith(appointmentToEdit);
  });
});
