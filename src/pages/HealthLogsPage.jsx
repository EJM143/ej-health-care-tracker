/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This file defines the HealthLogsPage component, which allows users to manage their health logs. 
 *    It fetches health logs from both Firebase and Local Storage, ensuring no duplicates by combining 
 *    and filtering the data. Users can add new health logs using a form and delete existing logs from 
 *    both Firebase and Local Storage. The component also displays the saved health logs in a table format.
 */

import React, { useState, useEffect } from 'react';
import HealthLogsForm from '../components/HealthLogsForm'; 
import { getCurrentUserUid, getHealthLogsFromFirebase, deleteHealthLogFromFirebase, saveHealthLog } from '../firebaseFunctions'; 
import Footer from './Footer';
import '../styles/App.css';

const HealthLogsPage = () => {
  const [healthLogsList, setHealthLogsList] = useState([]);

  // Load health logs from Firebase and Local Storage
  useEffect(() => {
    const loadHealthLogs = async () => {
      try {
        // Fetch health logs from Firebase
        const firebaseHealthLogs = await getHealthLogsFromFirebase();

        const userId = getCurrentUserUid();
        // Fetch health logs from Local Storage
        const localStorageHealthLogs1 = JSON.parse(localStorage.getItem('healthLogs')) || [];
        const localStorageHealthLogs = localStorageHealthLogs1.filter (e => e.userId === userId);

        // Combine health logs from Firebase and Local Storage
        const allHealthLogs = [...firebaseHealthLogs, ...localStorageHealthLogs];

        // Remove duplicates based on a unique identifier (healthDate and symptoms)
        const uniqueHealthLogs = [
          ...new Map(allHealthLogs.map((item) => [item.healthDate + item.symptoms, item])).values(),
        ];

        setHealthLogsList(uniqueHealthLogs);
      } catch (error) {
        console.error('Error fetching health logs:', error);
      }
    };

    loadHealthLogs();
  }, []); // Empty array to load health logs on mount


  /**
   * Deletes a health log from both Firebase and Local Storage.
   * @param {Object} healthLogToDelete - The health log object to be deleted.
   */
  const handleDeleteHealthLog = async (healthLogToDelete) => {
    try {
      // 1. Delete from Firebase
      await deleteHealthLogFromFirebase(healthLogToDelete.id);

      // 2. Remove from Local Storage
      const existingHealthLogs = JSON.parse(localStorage.getItem('healthLogs')) || [];
      const updatedHealthLogs = existingHealthLogs.filter(
        (log) => log.id !== healthLogToDelete.id
      );
      localStorage.setItem('healthLogs', JSON.stringify(updatedHealthLogs));

      // 3. Update the state to reflect the change
      setHealthLogsList(updatedHealthLogs);

    } catch (error) {
      console.error('Error deleting health log:', error);
    }
  };

  /**
   * Adds a new health log to Firebase and Local Storage, and updates the state.
   * @param {Object} newHealthLog - The new health log object to be added.
   */
  const handleAddHealthLog = async (newHealthLog) => {
    try {
      // 1. Add health log to Firebase
      await saveHealthLog(newHealthLog);

      // 2. Update Local Storage
      const existingHealthLogs = JSON.parse(localStorage.getItem('healthLogs')) || [];
      const updatedHealthLogs = [...existingHealthLogs, newHealthLog];
      localStorage.setItem('healthLogs', JSON.stringify(updatedHealthLogs));

      // 3. Update the state to include the new health log
      setHealthLogsList(updatedHealthLogs);

    } catch (error) {
      console.error('Error adding health log:', error);
    }
  };

  return (
    <div className="description">
      <h1>Health Logs</h1>
      <p>Manage your health logs here.</p>

      <div>
        <h3>Saved Health Logs</h3>
        {/* Table for displaying saved health logs */}
        <table>
          <thead>
            <tr>
              <th>Health Date</th>
              <th>Symptoms</th>
              <th>Blood Pressure</th>
              <th>Heart Rate</th>
              <th>Temperature</th>
              <th>Blood Glucose</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {healthLogsList.map((log, index) => (
              <tr key={index}>
                <td>{log.healthDate}</td>
                <td>{log.symptoms}</td>
                <td>{log.bloodPressure}</td>
                <td>{log.heartRate}</td>
                <td>{log.temperature}</td>
                <td>{log.bloodGlucose}</td>
                <td>{log.notes}</td>
                <td>
                  {/* Delete Button */}
                  <button onClick={() => handleDeleteHealthLog(log)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HealthLogsForm onAddHealthLog={handleAddHealthLog} /> {/* Form to add new health log */}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HealthLogsPage;
