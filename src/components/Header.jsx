/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This component provides a header for navigation and user authentication. It includes a logo and links 
 *    for navigating to different sections. It also offers sign-in, sign-out, and register options, with a logout 
 *    functionality integrated using Firebase. Upon logging out, users are redirected to the login page.
 */


import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { signOut } from 'firebase/auth'; 
import { auth } from '../firebase'; 
import '../styles/Header.css'; 
import logo from '../assets/EJLogo.png'; 

function Header() {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      alert('You have successfully logged out.'); 
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error.message);
      alert('Logout failed. Please try again.'); 
    }
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <img src={logo} alt="Health Care Tracker Logo" className="logo-img" />
        <h1 className="logo-text">Health Care Tracker</h1>
      </div>

      {/* Navigation Links Section */}
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
          <li><Link to="/medications">Medications</Link></li>
          <li><Link to="/health-logs">Health Logs</Link></li>
        </ul>
      </nav>

      {/* Authentication Links Section */}
      <div className="auth-links">
        <div className="auth-sign-in-register">
          <Link to="/login">Sign-In</Link> | <Link to="/register">Register</Link>
        </div>
        <div className="auth-sign-out">
          <button onClick={handleLogout} className="logout-button">Sign-Out</button>
          
          {/* SVG Delete Account Button */}
          <button onClick={() => navigate('/delete-account')} className="delete-icon">
            <svg xmlns="http://www.w3.org/2000/svg"width="24" height="24" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M9 6v14h6V6M5 6V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>


    </header>
  );
}

export default Header;
