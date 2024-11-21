import React, { useState, useEffect } from "react";
import Login from "./Component/Login"; // Import the new Login component
import BookList from "./Component/BookList"; // Component to display the list of books
import AdminView from "./Component/AdminView"; // Admin-specific components for adding/editing/deleting books

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");

  // Check local storage for existing token on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      setIsAdmin(true); // Assume token in local storage means admin access
    }
  }, []);

  // Callback to handle successful login
  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    setIsAdmin(true);
    localStorage.setItem("adminToken", token); // Save token to local storage
  };

  // Function to handle logout
  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("adminToken"); // Clear token from local storage
  };

  return (
    <div>
      <h1>Book Management System</h1>

      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} /> // Use Login component
      ) : (
        <div>
          {isAdmin ? (
            <div>
              <AdminView token={token} /> {/* Admin view - Can add/edit/delete books */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <BookList token={token} /> // Guest view - Can only view the books
          )}
        </div>
      )}

      {!isLoggedIn && <BookList token={token} />} {/* Guest view always visible, no login required */}
    </div>
  );
};

export default App;
