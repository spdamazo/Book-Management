import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Component/Login";
import BookList from "./Component/BookList";
import AdminView from "./Component/AdminView";
import BookForm from "./Component/BookForm";
import BookDetail from "./Component/BookDetail";

const App = () => {
  // State variables to track login status, admin status, authentication token, and search query
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const [isAdmin, setIsAdmin] = useState(false); // Tracks if the logged-in user is an admin
  const [token, setToken] = useState(""); // Holds the authentication token for the logged-in user
  const [searchQuery, setSearchQuery] = useState(null); // Holds the search query for book search

  // Effect hook to check for an existing token in localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken"); // Retrieve token from localStorage
    if (savedToken) {
      setToken(savedToken); // Set the token if it exists
      setIsLoggedIn(true); // Mark the user as logged in
      setIsAdmin(true); // Set the user as an admin if token exists
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handler for successful login
  const handleLoginSuccess = (token) => {
    setToken(token); // Set the token
    setIsLoggedIn(true); // Mark the user as logged in
    setIsAdmin(true); // Mark the user as an admin
    localStorage.setItem("adminToken", token); // Store the token in localStorage for persistence
  };

  // Handler for logout
  const handleLogout = () => {
    setToken(""); // Clear the token
    setIsLoggedIn(false); // Mark the user as logged out
    setIsAdmin(false); // Mark the user as not an admin
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
  };

  // Handler to reset the search query when navigating to the Book List
  const resetSearch = () => {
    setSearchQuery(null); // Clear the search query
  };

  return (
    <Router>
      <div>
        <h1>BVC Library</h1>

        {/* Navigation links for the app */}
        <nav>
          <Link to="/books" onClick={resetSearch} style={{ margin: "0 10px" }}>
            Book List
          </Link>
          {isAdmin && (
            <Link to="/add-book" style={{ margin: "0 10px" }}>
              Add Book
            </Link>
          )}
          {/* Conditional rendering of login/logout buttons */}
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ margin: "0 10px" }}>
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ margin: "0 10px" }}>
              Admin Login
            </Link>
          )}
        </nav>

        {/* Routes configuration */}
        <Routes>
          {/* Login route, passing the handleLoginSuccess function as a prop */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Book List route, passes token and searchQuery as props */}
          <Route
            path="/books"
            element={
              <BookList
                token={token}
                searchQuery={searchQuery} // Pass the search query to the BookList component
                setSearchQuery={setSearchQuery} // Pass the setter for search query to update it
              />
            }
          />

          {/* Admin route, only accessible if the user is an admin */}
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

          {/* Add Book route, only accessible to admins */}
          <Route
            path="/add-book"
            element={<BookForm token={token} onSuccess={() => {}} />}
          />

          {/* Edit Book route, accessed by passing a bookId as a parameter */}
          <Route path="/edit/:bookId" element={<BookForm token={token} />} />

          {/* Default route, renders BookList */}
          <Route
            path="/"
            element={
              <BookList
                token={token}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} // Pass search query and setter
              />
            }
          />

          {/* Detailed Book view route, rendered when a user clicks on a book */}
          <Route path="/book/:bookId" element={<BookDetail />} /> {/* Detailed view route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
