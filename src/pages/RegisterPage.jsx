/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component handles the user registration process, allowing users to create an account
 *    using Firebase Authentication. It collects user input, validates the input, and then attempts 
 *    to register the user with Firebase. If successful, it stores the user's name in localStorage 
 *    and firebase then redirects user to the homepage. It also handles loading state and error handling 
 *    during the registration process.
 */

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/App.css';

/**
 * RegisterPage component is responsible for rendering the registration form and handling
 * the user registration logic, including form validation and integration with Firebase Authentication.
 */
function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',     
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  /**
   * Handle input changes in the registration form.
   * @param {Event} e - The event triggered by user input in form fields.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handle form submission, validates input, and attempts to register the user with Firebase.
   * If successful, the user is redirected to the homepage.
   * @param {Event} e - The submit event triggered by the form submission.
   * @returns 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError(''); // Clear 
    setLoading(true); 

    try {
      // Register user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Save name to localStorage
      localStorage.setItem('userName', formData.name);

      alert('Registration successful!');
      navigate('/'); 
    } catch (err) {
      setError('Registration failed: ' + err.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="authentication-page">
      <h1>Register</h1>

      {error && <p className="error">{error}</p>} 

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label> 
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name"/>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} 
          onChange={handleChange} placeholder="Enter your password"/>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
            onChange={handleChange} placeholder="Confirm your password"/>
        </div>

        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button> 
      </form>
    </div>
  );
}

export default RegisterPage;
