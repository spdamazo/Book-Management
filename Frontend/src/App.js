import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Component/Login";
import BookList from "./Component/BookList";
import AdminView from "./Component/AdminView";
import BookForm from "./Component/BookForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [searchQuery, setSearchQuery] = useState(null); // Search state

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      setIsAdmin(true);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    setIsAdmin(true);
    localStorage.setItem("adminToken", token);
  };

  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("adminToken");
  };

  const resetSearch = () => {
    setSearchQuery(null); // Clear search when navigating to Book List
  };

  return (
    <Router>
      <div>
        <h1>BVC Library</h1>

        <nav>
          <Link to="/books" onClick={resetSearch} style={{ margin: "0 10px" }}>
            Book List
          </Link>
          {isAdmin && (
            <Link to="/add-book" style={{ margin: "0 10px" }}>
              Add Book
            </Link>
          )}
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

        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/books"
            element={
              <BookList
                token={token}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} // Pass state setter
              />
            }
          />
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
          <Route
            path="/add-book"
            element={<BookForm token={token} onSuccess={() => {}} />}
          />
          <Route path="/edit/:bookId" element={<BookForm token={token} />} />
          <Route
            path="/"
            element={
              <BookList
                token={token}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
