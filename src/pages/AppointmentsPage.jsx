/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This is a functional component that displays and manages a list of appointments.
 *    It fetches the appointments from Firebase and Local Storage, combines the data, 
 *    removes duplicates, and renders the list in a table format. The component provides 
 *    functionality to delete an appointment, which removes it both from Firebase and Local Storage.
 */

import React, { useState, useEffect } from 'react';
import AppointmentsForm from '../components/AppointmentsForm';
import { getCurrentUserUid, getAppointmentsFromFirebase, deleteAppointmentFromFirebase, saveAppointment } from '../firebaseFunctions';
import Footer from './Footer';
import '../styles/App.css';

const AppointmentsPage = () => {
  // State variable to store the list of appointments
  const [appointmentsList, setAppointmentsList] = useState([]);

  // Load appointments from Local Storage and Firebase 
  useEffect(() => {
    /**
     * Fetches appointments from Firebase and Local Storage,
     * combines them, removes duplicates, and updates the state.
     */
    const loadAppointments = async () => {
      try {
        // Fetch appointments from Firebase
        const firebaseAppointments = await getAppointmentsFromFirebase();

        const userId = getCurrentUserUid();
        // Fetch appointments from Local Storage
        const localStorageAppointments1 = JSON.parse(localStorage.getItem('appointments')) || [];
        const localStorageAppointments = localStorageAppointments1.filter (e => e.userId === userId);

        // Combine from Firebase and Local Storage
        const allAppointments = [...firebaseAppointments, ...localStorageAppointments];

        // Remove duplicates based on a unique identifier (appointmentDate and appointmentTime)
        const uniqueAppointments = [
          ...new Map(allAppointments.map((item) => [item.appointmentDate + item.appointmentTime, item])).values(),
        ];

        setAppointmentsList(uniqueAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    loadAppointments();
  }, []); // Empty array to load appointments on mount
  
  /**
   * Deletes an appointment by removing it from Firebase, Local Storage, and updating the state.
   * @param {Object} appointmentToDelete - - The appointment object to be deleted
   */

  const handleDelete = async (appointmentToDelete) => {
    try {
      // 1. Delete from Firebase
      await deleteAppointmentFromFirebase(appointmentToDelete.id);

      // 2. Remove from Local Storage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const updatedAppointments = existingAppointments.filter(
        (appointment) => appointment.id !== appointmentToDelete.id
      );
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      // 3. Update the state to reflect the change
      setAppointmentsList(updatedAppointments);

    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  /**
   * Adds a new appointment by saving it to Firebase, Local Storage, and updating the state.
   * @param {Object} newAppointment - The new appointment object to be added.
   */
  const handleAddAppointment = async (newAppointment) => {
    try {
      // Add appointment to Firebase
      await saveAppointment(newAppointment);  // Use the correct function here
  
      // Update Local Storage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const updatedAppointments = [...existingAppointments, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  
      // Update the state to include the new appointment
      setAppointmentsList(updatedAppointments);
  
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div className="description">
      <h1>Appointments</h1>
      <p>Manage your appointments here.</p>

      <div>
        <h3>Saved Appointments</h3>
        {/* Table for displaying saved appointments */}
        <table>
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Doctor</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsList.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.appointmentReason}</td>
                <td>
                  {/* Delete Button */}
                  <button onClick={() => handleDelete(appointment)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AppointmentsForm onAddAppointment={handleAddAppointment} />

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AppointmentsPage;
