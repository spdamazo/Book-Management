import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import necessary router components
import Login from "./Component/Login"; // Import the Login component
import BookList from "./Component/BookList"; // Component to display the list of books
import AdminView from "./Component/AdminView"; // Admin-specific components for adding/editing/deleting books
import BookForm from "./Component/BookForm"; // Import the BookForm for adding/editing books

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
    <Router>
      <div>
        <h1>Book Management System</h1>

        {/* Navigation links */}
        <nav>
          <Link to="/books" style={{ margin: "0 10px" }}>Book List</Link>
          {isAdmin && (
            <Link to="/add-book" style={{ margin: "0 10px" }}>Add Book</Link>
          )}
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} style={{ margin: "0 10px" }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ margin: "0 10px" }}>
              Admin Login
            </Link>
          )}
        </nav>

        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Route for the book list page */}
          <Route
            path="/books"
            element={<BookList token={token} />}
          />

          {/* Admin route for adding/editing books */}
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <div>
                  <AdminView token={token} />
                </div>
              ) : (
                <div>You do not have admin access</div>
              )
            }
          />

          {/* Route for adding a new book */}
          <Route
            path="/add-book"
            element={<BookForm token={token} onSuccess={() => {}} />} // Add a book form for admin
          />

          {/* Route for editing a book */}
          <Route
            path="/edit/:bookId"
            element={<BookForm token={token} />}
          />

          {/* Default route, redirect to /books */}
          <Route
            path="/"
            element={<BookList token={token} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
