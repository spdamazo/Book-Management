import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login } from "../api"; 

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    setLoading(true); 
    setMessage(""); 

    try {
      const response = await login(username, password);

      if (response.token) {
        setMessage("Login successful");
        onLoginSuccess(response.token); 
        navigate("/books"); 
      } else {
        setMessage("Login failed: No token received.");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <div className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          className="login-button" 
          onClick={handleLogin} 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
