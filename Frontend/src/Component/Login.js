import React, { useState } from "react"; // Import React and useState hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation after successful login
import { login } from "../api"; // Import the login function from the API

const Login = ({ onLoginSuccess }) => {
  // State variables to manage form input, loading state, and messages
  const [username, setUsername] = useState(""); // Stores the username input value
  const [password, setPassword] = useState(""); // Stores the password input value
  const [message, setMessage] = useState(""); // Stores messages (error or success)
  const [loading, setLoading] = useState(false); // Tracks the loading state while logging in
  const navigate = useNavigate(); // Hook for navigating to different routes after login

  // Function to handle login logic
  const handleLogin = async () => {
    setLoading(true); // Set loading to true while login is in progress
    setMessage(""); // Clear any previous messages before starting a new login attempt

    try {
      // Call the login API function with the username and password
      const response = await login(username, password);

      if (response.token) {
        // If a token is returned, set the success message and trigger onLoginSuccess
        setMessage("Login successful");
        onLoginSuccess(response.token); // Pass the token to the parent component (to handle token storage)
        navigate("/books"); // Navigate to the books page upon successful login
      } else {
        // If no token is returned, show a failure message
        setMessage("Login failed: No token received.");
      }
    } catch (error) {
      // If there's an error during the login process, log the error and display an error message
      console.error(error);
      setMessage(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false); // Set loading to false after the login attempt finishes
    }
  };

  return (
    <div className="login-container">
      {/* Login Title */}
      <h2 className="login-title">Admin Login</h2>
      <div className="login-form">
        {/* Username input field */}
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        />
        {/* Password input field */}
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        />
        {/* Login button that triggers handleLogin */}
        <button 
          className="login-button" 
          onClick={handleLogin} 
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login as Admin"} {/* Show loading text or default button text */}
        </button>
        {/* Display message after login attempt (success or error) */}
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
