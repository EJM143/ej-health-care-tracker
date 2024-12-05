/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component displays the login page for the application. It allows users to sign in using their 
 *    email and password or through their GitHub account. The page includes a form where users can enter 
 *    their credentials, with validation for required fields. Once user logs in, a success message is 
 *    displayed and users are redirected to the homepage. Error messages are displayed for invalid login 
 *    attempts or failed GitHub sign-ins.
 */

import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { githubSignIn } from '../firebaseFunctions'; 
import '../styles/App.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setMessage("You're already logged in!");
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  /**
   * Handles the changes in the input fields and updates the state accordingly.
   * @param {Object} e - The event object for the input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles the form submission for email and password login.
   * It validates if the required fields are filled and attempts to log the user in.
   * @param {Object} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    setError(''); // Clear previous error messages

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in:', userCredential.user);
      navigate('/'); 
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    }
  };

  /**
   * Handles the GitHub sign-in process. It calls the GitHub sign-in function and navigates upon success.
   */
  const handleGitHubSignIn = async () => {
    try {
      await githubSignIn(); 
      navigate('/'); 
    } catch (error) {
      console.error('GitHub sign-in failed:', error);
      setError('GitHub sign-in failed. Please try again.');
    }
  };

  return (
    <div className="authentication-page">
      <h1>Login</h1>

      {error && <p className="error">{error}</p>}

      {message && <p className="success">{message}</p>} 

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} 
          onChange={handleChange} placeholder="Enter your email" required/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password}
            onChange={handleChange} placeholder="Enter your password" required/>
        </div>

        <button type="submit">Login</button>
        <button type="button" onClick={handleGitHubSignIn}>Sign in with GitHub</button>
      </form>
    </div>
  );
};

export default LoginPage;

