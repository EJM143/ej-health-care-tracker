/**
 *    Name: Edale Miguel
 *    Date: December 1, 2024
 * 
 *    These tests validate the functionality of the MedicationsForm component. 
 *    It checks if the form elements render correctly, ensures that the form submits the correct data, 
 *    and verifies that the handleDelete function is called when medicationToEdit is provided.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MedicationsForm from '../MedicationsForm.jsx';
import { saveMedication } from '../../firebaseFunctions';

jest.mock('../../firebaseFunctions', () => ({
  saveMedication: jest.fn(),
}));

describe('MedicationsForm', () => {
  beforeEach(() => {
    saveMedication.mockClear();  
  });

  test('renders Medication Form correctly', () => {
    render(<MedicationsForm />);

    expect(screen.getByLabelText(/Medication Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dosage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instructions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submits the form with the correct data', async () => {
    render(<MedicationsForm />);

    fireEvent.change(screen.getByLabelText(/Medication Name/i), { target: { value: 'Aspirin' } });
    fireEvent.change(screen.getByLabelText(/Dosage/i), { target: { value: '500mg' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-12-01' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-12-10' } });
    fireEvent.change(screen.getByLabelText(/Instructions/i), { target: { value: 'Take once daily after meals' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(saveMedication).toHaveBeenCalledWith({
      medicationName: 'Aspirin',
      dosage: '500mg',
      startDate: '2024-12-01',
      endDate: '2024-12-10',
      instructions: 'Take once daily after meals',
    }));
  });

  test('calls handleDelete if medicationToEdit is provided', () => {
    const mockHandleDelete = jest.fn();
    const medicationToEdit = {
      medicationName: 'Aspirin',
      dosage: '500mg',
      startDate: '2024-12-01',
      endDate: '2024-12-10',
      instructions: 'Take once daily after meals',
    };

    render(<MedicationsForm medicationToEdit={medicationToEdit} handleDelete={mockHandleDelete} />);

    fireEvent.click(screen.getByRole('button', { name: /delete medication/i }));

    expect(mockHandleDelete).toHaveBeenCalledWith(medicationToEdit);
  });
});

