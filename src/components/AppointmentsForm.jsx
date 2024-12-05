/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component provides a form for scheduling, editing, and managing medical appointments.
 *    It allows users to input appointment details such as date, time, doctor’s name, and reason for the visit. 
 *    The form supports both adding new appointments and deleting existing ones. 
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { saveAppointment } from '../firebaseFunctions'; // Assuming firebaseFunctions is set up correctly

/**
 * AppointmentsForm component for scheduling, editing, and deleting appointments.
 * @param {Object} props 
 * @param {Object} props.appointmentToEdit 
 * @param {Function} props.handleDelete 
 * @returns {JSX.Element} 
 */
const AppointmentsForm = ({ appointmentToEdit, handleDelete }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');

  // Effect hook to populate the form with the appointment data if editing an existing appointment
  useEffect(() => {
    if (appointmentToEdit) {
      setAppointmentDate(appointmentToEdit.appointmentDate);
      setAppointmentTime(appointmentToEdit.appointmentTime);
      setDoctorName(appointmentToEdit.doctorName);
      setAppointmentReason(appointmentToEdit.appointmentReason);
    }
  }, [appointmentToEdit]);

  /**
   * Handles form submission (adding or editing an appointment)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = { appointmentDate, appointmentTime, doctorName, appointmentReason };

    // Save to Firebase 
    try {
      await saveAppointment(appointmentData);

      // Save to Local Storage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      existingAppointments.push(appointmentData);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));

      // Reset form fields
      setAppointmentDate('');
      setAppointmentTime('');
      setDoctorName('');
      setAppointmentReason('');
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  /**
   * Handles deleting the current appointment (if editing an existing appointment)
   */
  const handleDeleteClick = () => {
    if (appointmentToEdit) {
      handleDelete(appointmentToEdit);
    }
  };

  return (
    <div className="authentication-page">
      <div className="form-container">
        <h2>{appointmentToEdit ? 'Edit Appointment' : 'Schedule an Appointment'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input 
              type="date" 
              id="appointmentDate" 
              name="appointmentDate" 
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentTime">Appointment Time</label>
            <input 
              type="time" 
              id="appointmentTime" 
              name="appointmentTime" 
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctorName">Doctor's Name</label>
            <input 
              type="text" 
              id="doctorName" 
              name="doctorName" 
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)} 
              placeholder="Enter doctor's name" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentReason">Reason for Visit</label>
            <textarea 
              id="appointmentReason" 
              name="appointmentReason" 
              value={appointmentReason} 
              onChange={(e) => setAppointmentReason(e.target.value)} 
              rows="4" 
              placeholder="Enter the reason for the visit" 
              required 
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">Submit</button>

          {appointmentToEdit && (
            <button type="button" className="btn-delete" onClick={handleDeleteClick}>Delete Appointment</button>
          )}
        </form>
      </div>
    </div>
  );
};

// PropTypes 
AppointmentsForm.propTypes = {
  appointmentToEdit: PropTypes.shape({
    appointmentDate: PropTypes.string,
    appointmentTime: PropTypes.string,
    doctorName: PropTypes.string,
    appointmentReason: PropTypes.string,
  }),
  handleDelete: PropTypes.func
};

export default AppointmentsForm;
