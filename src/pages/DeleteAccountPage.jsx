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
            await deleteAccount(); // Call the Firebase function
            alert('Your account has been deleted successfully.');
            navigate('/register'); // Redirect to register or home
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
