/**
 *    Name: [Your Name]
 *    Date: November 28, 2024
 * 
 *    This file contains Firebase-related functions for managing user data, including appointments, medications, and health logs.
 *    It provides functions to save, fetch, and delete data from Firestore, as well as handle user authentication via GitHub.
 *    It also manages local storage for offline data syncing.
 */

import { collection, addDoc, getDocs, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase'; 
import { getAuth, deleteUser, GithubAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

/** Helper function to get the current users UID **/
export const getCurrentUserUid = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('User not authenticated');
  }
  return currentUser.uid;
};

const manageLocalStorage = (key, data = null) => {
  let storedData = JSON.parse(localStorage.getItem(key)) || [];

  if (data !== null) {
    if (!storedData.some(item => item.id === data.id)) {
      storedData.push(data);
      localStorage.setItem(key, JSON.stringify(storedData));
    }
  } else {
    return storedData;
  }
};

const updateLocalStorage = (key, id) => {
  const updatedData = manageLocalStorage(key).filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updatedData));
};

const saveDocument = async (collectionName, data) => {
  try {
    const userId = getCurrentUserUid();
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      userId,
      createdAt: new Date(),
    });
    console.log(`${collectionName} saved with ID:`, docRef.id);

    manageLocalStorage(collectionName, { id: docRef.id, ...data });
  } catch (e) {
    console.error(`Error saving ${collectionName}:`, e);
  }
};

const getDocumentsFromFirebase = async (collectionName) => {
  try {
    const userId = getCurrentUserUid();
    const documentsQuery = query(collection(db, collectionName), where('userId', '==', userId));
    const querySnapshot = await getDocs(documentsQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error getting ${collectionName}:`, error);
    return [];
  }
};

const deleteDocumentFromFirebase = async (collectionName, id) => {
  try {

    const docRef = doc(db, collectionName, id);
    console.log(`Attempting to delete document from Firestore with ID: ${id}`);

    await deleteDoc(docRef);
    console.log(`${collectionName} deleted with ID:`, id);

    updateLocalStorage(collectionName, id);
  } catch (error) {
    console.error(`Error deleting ${collectionName}:`, error);
  }
};

/** Appointments **/

// Save an appointment
export const saveAppointment = (appointmentData) => saveDocument('appointments', appointmentData);

// Get appointments from Firestore
export const getAppointmentsFromFirebase = () => getDocumentsFromFirebase('appointments');

// Delete an appointment
export const deleteAppointmentFromFirebase = (id) => deleteDocumentFromFirebase('appointments', id);

/** Medications **/

// Save a medication
export const saveMedication = (medicationData) => saveDocument('medications', medicationData);

// Get medications from Firestore
export const getMedicationsFromFirebase = () => getDocumentsFromFirebase('medications');

// Delete a medication
export const deleteMedicationFromFirebase = (id) => deleteDocumentFromFirebase('medications', id);

/** Health Logs **/

// Save a health log
export const saveHealthLog = (healthLogData) => saveDocument('healthLogs', healthLogData);

// Get health logs from Firestore
export const getHealthLogsFromFirebase = () => getDocumentsFromFirebase('healthLogs');

// Delete a health log
export const deleteHealthLogFromFirebase = (id) => deleteDocumentFromFirebase('healthLogs', id);


// Fetch data from Firestore
export const fetchUserData = async () => {
  try {
    const userId = getCurrentUserUid(); 
    const userDocRef = doc(db, 'users', userId); 
    const userSnapshot = await getDoc(userDocRef);
    
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log('No user data found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const githubSignIn = async () => {
  const provider = new GithubAuthProvider();

  // This forces GitHub to prompt the user every time they log in
  provider.setCustomParameters({ prompt: 'consent' });

  try {
    const result = await signInWithPopup(auth, provider);
    console.log('GitHub sign-in successful:', result.user);

    // You can store user data in your app's state or database
    const user = result.user;
    console.log('User data:', user);

  } catch (error) {
    console.error('Error during GitHub sign-in:', error.message);
  }
};

/** Sign Out **/

export const handleSignOut = async () => {
  try {
    await firebaseSignOut(auth);

    localStorage.removeItem('appointments');
    localStorage.removeItem('medications');
    localStorage.removeItem('healthLogs');
    console.log('Relevant local storage cleared.');

    return { success: true };
  } catch (error) {
    console.error('Error during sign-out:', error.message);
    return { success: false, message: error.message };
  }
};

// Delete Account Function

export const deleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error('No user is currently logged in.');
    }

    await deleteUser(user);
};

