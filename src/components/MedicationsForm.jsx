/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component provides a form that allows users to record or edit medication details.
 *    It manages state for medication name, dosage, start and end dates. The form supports 
 *    both creating new medication entries and updating/deleting existing ones. Data is saved to Firebase 
 *    and also stored in Local Storage for persistence across page reloads.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { saveMedication } from '../firebaseFunctions';

const MedicationsForm = ({ medicationToEdit, handleDelete }) => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (medicationToEdit) {
      setMedicationName(medicationToEdit.medicationName);
      setDosage(medicationToEdit.dosage);
      setStartDate(medicationToEdit.startDate);
      setEndDate(medicationToEdit.endDate);
      setInstructions(medicationToEdit.instructions);
    }
  }, [medicationToEdit])

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const medicationData = {medicationName, dosage, startDate, endDate, instructions};

    try {
      await saveMedication(medicationData);

    // Get the existing medications from Local Storage
    const existingMedications = JSON.parse(localStorage.getItem('medications')) || [];

    // Add medication to the list
    existingMedications.push(medicationData);

    // Save medications back to Local Storage
    localStorage.setItem('medications', JSON.stringify(existingMedications));

    // Reset form fields
    setMedicationName('');
    setDosage('');
    setStartDate('');
    setEndDate('');
    setInstructions('');
  } catch (error) {
    console.error('Error saving medication:', error);
  }
};

const handleDeleteClick = () => {
  if (medicationToEdit) {
    handleDelete(medicationToEdit);
  }
};

  return (
    <div className="authentication-page">
        <div className="form-container">
        <h2>Record a Medication</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="medicationName">Medication Name</label>
              <input type="text" id="medicationName" name="medicationName" value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)} placeholder="Enter medication name" required/>
            </div>

            <div className="form-group">
              <label htmlFor="dosage">Dosage</label>
              <input type="text" id="dosage" name="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)}
                placeholder="Enter dosage" required/>
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" name="startDate" value={startDate}
                onChange={(e) => setStartDate(e.target.value)} required/>
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea id="instructions" name="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}
              rows="4" placeholder="Enter instructions for the medication" required></textarea>
            </div>

            <button type="submit" className="btn-submit">Submit</button>
            
            {medicationToEdit && (
              <button type="button" className="btn-delete" onClick={handleDeleteClick}>Delete Medication</button>
            )}
        </form>
        </div>
    </div>
  );
};

// PropTypes 
MedicationsForm.propTypes = {
  medicationToEdit: PropTypes.shape({
    medicationName: PropTypes.string,
    dosage: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    instructions: PropTypes.string,
  }),
  handleDelete: PropTypes.func,
};

export default MedicationsForm;