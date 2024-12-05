/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 *    
 *    This component provides a form for users to record health logs, including date, symptoms, and additional notes.
 *    It allows users to input details about their health condition. Upon form submission, the health log is saved 
 *    to Firebase, and it is also stored in the browser's local storage for persistence. The form clears the fields 
 *    after successful submission.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveHealthLog } from '../firebaseFunctions'; 

const HealthLogsForm = ({ healthLogToEdit, handleDelete }) => {
  const [healthDate, setHealthDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [notes, setNotes] = useState('');
  

  // Use effect to populate when editing a health log
  useEffect(() => {
    if (healthLogToEdit) {
      setHealthDate(healthLogToEdit.healthDate);
      setSymptoms(healthLogToEdit.symptoms);
      setBloodPressure(healthLogToEdit.bloodPressure);
      setHeartRate(healthLogToEdit.heartRate);
      setTemperature(healthLogToEdit.temperature);
      setBloodGlucose(healthLogToEdit.bloodGlucose);
      setNotes(healthLogToEdit.notes);
    }
  }, [healthLogToEdit]);

  /**
   * Handles form submission, saves data to Firebase and local storage
   */
  const handleSubmit = async (e) => { 
    e.preventDefault();

    const healthLogData = { healthDate, symptoms, bloodPressure, heartRate, temperature, bloodGlucose, notes };

    try {
      // Save to Firebase
      await saveHealthLog(healthLogData);

      // Save to Local Storage
      const existingHealthLogs = JSON.parse(localStorage.getItem('healthLogs')) || [];
      existingHealthLogs.push(healthLogData);
      localStorage.setItem('healthLogs', JSON.stringify(existingHealthLogs));

      // Reset form fields
      setHealthDate('');
      setSymptoms('');
      setBloodPressure('');
      setHeartRate('');
      setTemperature('');
      setBloodGlucose('');
      setNotes('');

    } catch (error) {
      console.error('Error saving health log:', error);
    }
  };

  /**
   * Handles health log deletion 
   */
  const handleDeleteClick = () => {
    if (healthLogToEdit) {
      handleDelete(healthLogToEdit);
    }
  };

  return (
    <div className="authentication-page">
      <div className="form-container">
        <h2>Record a Health Log</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="healthDate">Date of Log</label>
            <input type="date" id="healthDate" name="healthDate" value={healthDate}
              onChange={(e) => setHealthDate(e.target.value)} required/>
          </div>
          
          <div className="form-group">
            <label htmlFor="symptoms">Symptoms</label>
            <textarea id="symptoms" name="symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} 
            rows="4" placeholder="Enter any symptoms experienced" required/>
          </div>

          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure</label>
            <input type="text" id="bloodPressure" name="bloodPressure" value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)} placeholder="e.g. 120/80"/>
          </div>

          <div className="form-group">
            <label htmlFor="heartRate">Heart Rate</label>
            <input type="number" id="heartRate" name="heartRate" value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)} placeholder="e.g. 72"/>
          </div>

          <div className="form-group">
            <label htmlFor="temperature">Temperature (°F)</label>
            <input type="number" id="temperature" name="temperature" value={temperature}
              onChange={(e) => setTemperature(e.target.value)} placeholder="e.g. 98.6"/>
          </div>

          <div className="form-group">
            <label htmlFor="bloodGlucose">Blood Glucose Level (mg/dL)</label>
            <input type="number" id="bloodGlucose" name="bloodGlucose" value={bloodGlucose}
              onChange={(e) => setBloodGlucose(e.target.value)} placeholder="e.g. 120"/>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
            rows="4" placeholder="Enter additional notes or observations"/>
          </div>

          <button type="submit" className="btn-submit">Submit</button>
          
          {healthLogToEdit && (
            <button type="button" className="btn-delete" onClick={handleDeleteClick}>Delete Health Log</button>
          )}
        </form>
      </div>
    </div>
  );
};

HealthLogsForm.propTypes = {
  healthLogToEdit: PropTypes.shape({
    healthDate: PropTypes.string.isRequired,
    symptoms: PropTypes.string.isRequired,
    notes: PropTypes.string,
    bloodPressure: PropTypes.string,
    heartRate: PropTypes.string,
    temperature: PropTypes.string,
    bloodGlucose: PropTypes.string
  }),
  handleDelete: PropTypes.func
};
export default HealthLogsForm;
