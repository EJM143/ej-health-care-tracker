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

import React from 'react';
import { addDoc } from 'firebase/firestore';
import { auth } from '../../firebase'; 
import { saveAppointment } from '../../firebaseFunctions';
import { collection } from 'firebase/firestore';

jest.mock('../../firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' },
  },
  db: {}, 
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(), 
  addDoc: jest.fn(),
}));

describe('saveAppointment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save an appointment to Firestore and update local storage', async () => {
    const mockData = { title: 'Doctor Visit', date: '2024-12-10' };
    const mockDocRef = { id: 'mockDocId' };

    addDoc.mockResolvedValue(mockDocRef);
    
    const mockCollectionRef = { collectionName: 'appointments' };
    collection.mockReturnValue(mockCollectionRef);

    const mockLocalStorageSetItem = jest.spyOn(Storage.prototype, 'setItem');
    const mockLocalStorageGetItem = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('[]');

    await saveAppointment(mockData);

    expect(auth.currentUser.uid).toBe('testUserId');
    expect(collection).toHaveBeenCalledWith(expect.anything(), 'appointments');
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      ...mockData,
      userId: 'testUserId',
      createdAt: expect.any(Date),
    });

    expect(mockLocalStorageGetItem).toHaveBeenCalledWith('appointments');
    expect(mockLocalStorageSetItem).toHaveBeenCalledWith(
      'appointments',
      JSON.stringify([{ id: 'mockDocId', ...mockData }])
    );
  });

  it('should log an error if saving fails', async () => {
    const mockData = { title: 'Doctor Visit', date: '2024-12-10' };

    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    addDoc.mockRejectedValue(new Error('Test Error'));

    await saveAppointment(mockData);

    expect(mockConsoleError).toHaveBeenCalledWith('Error saving appointments:', expect.any(Error));

    mockConsoleError.mockRestore();
  });
});
