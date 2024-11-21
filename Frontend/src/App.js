import React, { useState } from 'react';
import { login } from './api'; // Assuming your API file is named `api.js`
import BookList from './Component/BookList'; // Component to display the list of books
import AdminView from './Component/AdminView'; // Admin-specific components for adding/editing/deleting books

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState('');

  // Function to handle admin login
  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      setMessage(response.message || 'Login successful');
      setToken(response.token);
      setIsLoggedIn(true);
      setIsAdmin(true); // If logged in as admin
    } catch (error) {
      setMessage(error.message || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Book Management System</h1>

      {!isLoggedIn ? (
        // Admin Login form
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
      ) : (
        // If logged in, show admin or guest view
        <div>
          {isAdmin ? (
            <AdminView token={token} /> // Admin view - Can add/edit/delete books
          ) : (
            <BookList /> // Guest view - Can only view the books
          )}
        </div>
      )}

      {!isLoggedIn && <BookList />} {/* Guest view always visible, no login required */}
    </div>
  );
};

export default App;