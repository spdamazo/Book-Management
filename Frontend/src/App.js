import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./Component/Login.js";
import BookList from "./Component/BookList.js";
import AdminView from "./Component/AdminView.js";
import BookForm from "./Component/BookForm.js";
import BookDetail from "./Component/BookDetail.js";
import './App.css'; // Importing the CSS file

const App = () => {
  // State to manage the login status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Whether the user is logged in
  const [isAdmin, setIsAdmin] = useState(false); // Whether the user is an admin
  const [token, setToken] = useState(""); // Stores the authentication token
  const [searchQuery, setSearchQuery] = useState(null); // Stores the search query for books

  // Check if a token exists in localStorage when the component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken"); // Retrieve the token from localStorage
    if (savedToken) {
      setToken(savedToken); // Set the retrieved token to state
      setIsLoggedIn(true); // Set login status to true
      setIsAdmin(true); // Set admin status to true
    }
  }, []); // Runs only once when the component mounts

  // Handles login success by updating token and login status
  const handleLoginSuccess = (token) => {
    setToken(token); // Store the token in state
    setIsLoggedIn(true); // Set login status to true
    setIsAdmin(true); // Set admin status to true
    localStorage.setItem("adminToken", token); // Save the token in localStorage for persistence
  };

  return (
    <Router>
      <MainApp
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        token={token}
        setToken={setToken}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleLoginSuccess={handleLoginSuccess}
      />
    </Router>
  );
};

const MainApp = ({
  isLoggedIn,
  setIsLoggedIn,
  isAdmin,
  setIsAdmin,
  token,
  setToken,
  searchQuery,
  setSearchQuery,
  handleLoginSuccess,
}) => {
  const navigate = useNavigate(); // Hook for navigating to different routes

  // Handles user logout
  const handleLogout = () => {
    setToken(""); // Clear the token in state
    setIsLoggedIn(false); // Set login status to false
    setIsAdmin(false); // Set admin status to false
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    navigate("/books"); // Navigate to the Book List page after logging out
  };

  // Resets the search query when navigating back to the book list
  const resetSearch = () => {
    setSearchQuery(null); // Clear the search query
  };

  return (
    <div>
      {/* Application title */}
      <h1>BVC Library</h1>

      {/* Navigation bar */}
      <nav>
        {/* Link to the Book List page */}
        <Link to="/books" onClick={resetSearch} className="nav-link">
          Book List
        </Link>
        {/* Link to the Add Book page, visible only to admins */}
        {isAdmin && (
          <Link to="/add-book" className="nav-link">
            Add Book
          </Link>
        )}
        {/* Show login or logout options based on the login status */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-link">
            Admin Login
          </Link>
        )}
      </nav>

      {/* Routes for different parts of the application */}
      <Routes>
        {/* Login page route */}
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        {/* Book List page route */}
        <Route
          path="/books"
          element={
            <BookList
              token={token}
              searchQuery={searchQuery} // Passes the current search query
              setSearchQuery={setSearchQuery} // Function to update the search query
            />
          }
        />

        {/* Admin view route (accessible only to admins) */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <div>
                <AdminView token={token} />
              </div>
            ) : (
              <div>You do not have admin access</div> // Message for non-admin users
            )
          }
        />

        {/* Add Book page route (accessible only to admins) */}
        <Route
          path="/add-book"
          element={<BookForm token={token} onSuccess={() => {}} />}
        />

        {/* Edit Book page route (accessible only to admins) */}
        <Route
          path="/edit/:bookId"
          element={<BookForm token={token} />}
        />

        {/* Default route, renders the Book List */}
        <Route
          path="/"
          element={
            <BookList
              token={token}
              searchQuery={searchQuery} // Passes the current search query
              setSearchQuery={setSearchQuery} // Function to update the search query
            />
          }
        />

        {/* Book Detail page route */}
        <Route
          path="/book/:bookId"
          element={<BookDetail />} // Displays detailed information about a book
        />
      </Routes>
    </div>
  );
};

export default App;
