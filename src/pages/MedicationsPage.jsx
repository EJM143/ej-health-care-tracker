/**
 *    Name: Edale Miguel
 *    Date: 11/30/2024
 * 
 *    This is a functional component that displays and manages a list of appointments.
 *    It fetches the appointments from Firebase and Local Storage, combines the data, 
 *    removes duplicates, and renders the list in a table format. The component provides 
 *    functionality to delete an appointment, which removes it both from Firebase and Local Storage.
 */
 
import React, { useState, useEffect } from 'react';
import MedicationsForm from '../components/MedicationsForm';
import { getCurrentUserUid, getMedicationsFromFirebase, deleteMedicationFromFirebase, saveMedication } from '../firebaseFunctions';
import Footer from './Footer';
import '../styles/App.css';

const MedicationsPage = () => {
  const [medicationsList, setMedicationsList] = useState([]);

  /**
   * Effect hook to load medications from Firebase and Local Storage on component mount.
   */
  useEffect(() => {
    const loadMedications = async () => {
      try {
        // Fetch medications from Firebase
        const firebaseMedications = await getMedicationsFromFirebase();

        const userId = getCurrentUserUid();
        // Fetch medications from Local Storage
        const localStorageMedications1 = JSON.parse(localStorage.getItem('medications')) || [];
        const localStorageMedications = localStorageMedications1.filter (e => e.userId === userId);

        // Combine medications from Firebase and Local Storage
        const allMedications = [...firebaseMedications, ...localStorageMedications];

        // Remove duplicates based on a unique identifier (medicationName and startDate)
        const uniqueMedications = [
          ...new Map(allMedications.map((item) => [item.medicationName + item.startDate, item])).values(),
        ];

        setMedicationsList(uniqueMedications);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    loadMedications();
  }, []); // Empty array to load medications on mount

  /**
   * Deletes a medication from Firebase and Local Storage.
   * @param {Object} medicationToDelete - The medication to be deleted.
   */
  const handleDeleteMedication = async (medicationToDelete) => {
    try {
      // 1. Delete from Firebase
      await deleteMedicationFromFirebase(medicationToDelete.id);

      // 2. Remove from Local Storage
      const existingMedications = JSON.parse(localStorage.getItem('medications')) || [];
      const updatedMedications = existingMedications.filter(
        (medication) => medication.id !== medicationToDelete.id
      );
      localStorage.setItem('medications', JSON.stringify(updatedMedications));

      // 3. Update the state to reflect the change
      setMedicationsList(updatedMedications);

    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  /**
   * Adds a new medication to Firebase and Local Storage.
   * @param {Object} newMedication - The new medication to be added.
   */
  const handleAddMedication = async (newMedication) => {
    try {
      // 1. Add medication to Firebase
      await saveMedication(newMedication);
  
      // 2. Update Local Storage
      const existingMedications = JSON.parse(localStorage.getItem('medications')) || [];
      const updatedMedications = [...existingMedications, newMedication];
      localStorage.setItem('medications', JSON.stringify(updatedMedications));
  
      // 3. Update the state to include the new medication
      setMedicationsList(updatedMedications);
  
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  return (
    <div className="description">
      <h1>Medications</h1>
      <p>Manage your medications here.</p>

      <div>
        <h3>Saved Medications</h3>
        {/* Table for displaying saved medications */}
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Instructions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicationsList.map((medication, index) => (
              <tr key={index}>
                <td>{medication.medicationName}</td>
                <td>{medication.dosage}</td>
                <td>{medication.startDate}</td>
                <td>{medication.endDate}</td>
                <td>{medication.instructions}</td>
                <td>
                  {/* Delete Button */}
                  <button onClick={() => handleDeleteMedication(medication)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MedicationsForm onAddMedication={handleAddMedication} /> 

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MedicationsPage;
