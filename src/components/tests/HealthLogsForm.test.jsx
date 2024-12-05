/**
 *    Name: Edale Miguel 
 *    Date: December 1, 2024
 * 
 *    This file contains tests for the `HealthLogsForm` component, which allows users to input and save health logs. 
 *    The tests include verifying the form renders correctly, checking that the form submits the correct data to 
 *    the `saveHealthLog` function, and testing the deletion functionality if a health log is provided for editing. 
 *    The `saveHealthLog` function and form behaviors are mocked for isolated testing.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HealthLogsForm from '../HealthLogsForm.jsx';
import { saveHealthLog } from '../../firebaseFunctions';

jest.mock('../../firebaseFunctions', () => ({
  saveHealthLog: jest.fn(),
}));

describe('HealthLogsForm', () => {
  beforeEach(() => {
    saveHealthLog.mockClear(); 
  });

  test('renders Health Log Form correctly', () => {
    render(<HealthLogsForm />);

    expect(screen.getByLabelText(/Date of Log/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Symptoms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blood Pressure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Heart Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Temperature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blood Glucose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submits the form with the correct data', async () => {
    render(<HealthLogsForm />);

    fireEvent.change(screen.getByLabelText(/Date of Log/i), { target: { value: '2024-12-01' } });
    fireEvent.change(screen.getByLabelText(/Symptoms/i), { target: { value: 'Headache' } });
    fireEvent.change(screen.getByLabelText(/Blood Pressure/i), { target: { value: '120/80' } });
    fireEvent.change(screen.getByLabelText(/Heart Rate/i), { target: { value: '75' } });
    fireEvent.change(screen.getByLabelText(/Temperature/i), { target: { value: '98' } });
    fireEvent.change(screen.getByLabelText(/Blood Glucose/i), { target: { value: '110' } });
    fireEvent.change(screen.getByLabelText(/Notes/i), { target: { value: 'Mild discomfort' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(saveHealthLog).toHaveBeenCalledWith({
      healthDate: '2024-12-01',
      symptoms: 'Headache',
      bloodPressure: '120/80',
      heartRate: '75',
      temperature: '98',
      bloodGlucose: '110',
      notes: 'Mild discomfort',
    }));
  });

  test('calls handleDelete if healthLogToEdit is provided', () => {
    const mockHandleDelete = jest.fn();
    const healthLogToEdit = {
      healthDate: '2024-12-01',
      symptoms: 'Headache',
      bloodPressure: '120/80',
      heartRate: '75',
      temperature: '98',
      bloodGlucose: '110',
      notes: 'Mild discomfort',
    };

    render(<HealthLogsForm healthLogToEdit={healthLogToEdit} handleDelete={mockHandleDelete} />);

    fireEvent.click(screen.getByRole('button', { name: /delete health log/i }));

    expect(mockHandleDelete).toHaveBeenCalledWith(healthLogToEdit);
  });
});
