/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains tests for the `saveAppointment` function, which saves appointment data 
 *    to Firestore and updates the local storage. It mocks Firestore's `addDoc`, `collection` methods, 
 *    and `localStorage` to test saving functionality and error handling. 
 *    The tests ensure that the function calls Firestore and localStorage correctly, handles errors, 
 *    and updates the data as expected.
 */

import { addDoc } from 'firebase/firestore';
import { auth } from '../../firebase'; 
import { saveAppointment } from '../../firebaseFunctions';
import { collection } from 'firebase/firestore';

jest.mock('../../firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' },
  },
  db: {}, // Mock Firestore's db if used directly
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(), // Mock Firestore collection method
  addDoc: jest.fn(),
}));

describe('saveAppointment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save an appointment to Firestore and update local storage', async () => {
    const mockData = { title: 'Doctor Visit', date: '2024-12-10' };
    const mockDocRef = { id: 'mockDocId' };

    // Mocking Firestore's addDoc function
    addDoc.mockResolvedValue(mockDocRef);
    
    // Mock collection function to return a mock collection reference
    const mockCollectionRef = { collectionName: 'appointments' };
    collection.mockReturnValue(mockCollectionRef);

    // Mocking localStorage methods
    const mockLocalStorageSetItem = jest.spyOn(Storage.prototype, 'setItem');
    const mockLocalStorageGetItem = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('[]');

    // Call the function to be tested
    await saveAppointment(mockData);

    // Assert that currentUser's UID was accessed
    expect(auth.currentUser.uid).toBe('testUserId');

    // Assert addDoc was called with the correct arguments
    expect(collection).toHaveBeenCalledWith(expect.anything(), 'appointments');
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      ...mockData,
      userId: 'testUserId',
      createdAt: expect.any(Date),
    });

    // Assert localStorage behaviors
    expect(mockLocalStorageGetItem).toHaveBeenCalledWith('appointments');
    expect(mockLocalStorageSetItem).toHaveBeenCalledWith(
      'appointments',
      JSON.stringify([{ id: 'mockDocId', ...mockData }])
    );
  });

  it('should log an error if saving fails', async () => {
    const mockData = { title: 'Doctor Visit', date: '2024-12-10' };

    // Mocking console.error
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    // Simulate Firestore error
    addDoc.mockRejectedValue(new Error('Test Error'));

    // Call the function and handle error
    await saveAppointment(mockData);

    // Assert console.error was called
    expect(mockConsoleError).toHaveBeenCalledWith('Error saving appointments:', expect.any(Error));

    // Restore original console.error behavior
    mockConsoleError.mockRestore();
  });
});
