import React, { useState } from "react";
import { login } from "../api"; // Adjust the import path based on your folder structure

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleLogin = async () => {
    setLoading(true); // Start loading
    setMessage(""); // Reset previous message

    try {
      const response = await login(username, password);
      
      // Assuming the response contains the token in the response.data
      if (response.token) {
        setMessage("Login successful");
        // Notify parent component of successful login
        onLoginSuccess(response.token);
      } else {
        setMessage("Login failed: No token received.");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login as Admin"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
