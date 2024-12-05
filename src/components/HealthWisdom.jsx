/**
 *    Name: Edale Miguel
 *    Date: December 3, 2024
 * 
 *    This component fetches and displays health-related advice from an external API.
 *    It handles loading and error states to provide a smooth user experience.
 */

import React, { useState, useEffect } from 'react';
import '../styles/App.css'; 

const HealthWisdom = () => {
    // State to store the advice
    const [advice, setAdvice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to fetch advice
    const fetchAdvice = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice);  
        } catch (err) {
            setError('Oops! Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch advice when the component mounts
    useEffect(() => {
        fetchAdvice();
    }, []);

    return (
        <div className="fun-zone">
            <h1>Health Wisdom</h1>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="joke-container">
                <p className="joke">{advice}</p>
                </div>
            )}

            <button className="new-joke-button" onClick={fetchAdvice}>Get New Advice</button>
        </div>
    );
};

export default HealthWisdom;
