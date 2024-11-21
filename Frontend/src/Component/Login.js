import React, { useState } from "react";
import { login } from "../api"; // Adjust the import path based on your folder structure

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      setMessage(response.message || "Login successful");

      // Notify parent component of successful login
      onLoginSuccess(response.token);
    } catch (error) {
      setMessage(error.message || "Login failed");
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
      <button onClick={handleLogin}>Login as Admin</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
