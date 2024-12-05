/**
 *      Name: Edale Miguel
 *      Date: December 4, 2024
 *      
 *      This component allows users to confirm and delete their account. It handles the deletion process, 
 *      displays error messages if the action fails, and redirects the user to the registration page upon success.
 */


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../firebaseFunctions';
import '../styles/App.css';


const DeleteAccountPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setLoading(true);
        setError('');
        try {
            await deleteAccount();
            alert('Your account has been deleted successfully.');
            navigate('/register'); 
        } catch (err) {
            setError('Failed to delete account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-account-page">
            <h2>Confirm Account Deletion</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            {error && <p className="error">{error}</p>}
            <button className="delete-btn" onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Yes, Delete My Account'}
            </button>
            <button className="delete-btn" onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default DeleteAccountPage;
