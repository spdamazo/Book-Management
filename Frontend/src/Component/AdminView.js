import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation for redirection
import BookForm from "./BookForm.js"; // Import the form for adding or editing books
import BookList from "./BookList.js"; // Import the list of books that admins can manage
import "../App.css"; // Import general CSS styles

const AdminView = ({ token }) => {
  const navigate = useNavigate(); // Initialize navigation

  // Redirect to login if token is not provided
  if (!token) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You need to be logged in as an admin to access this page.</p>
        <button onClick={() => navigate("/login")} className="redirect-button">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2> {/* Title of the admin dashboard */}

      {/* Section for adding or editing books */}
      <div className="admin-section">
        <h3 className="section-title">Add or Edit Books</h3>
        <BookForm token={token} />
      </div>

      {/* Section for managing book list */}
      <div className="admin-section">
        <h3 className="section-title">Books List</h3>
        <BookList token={token} />
      </div>
    </div>
  );
};

export default AdminView;
