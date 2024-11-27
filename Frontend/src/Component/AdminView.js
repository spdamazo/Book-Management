import React from "react";
import { useNavigate } from "react-router-dom"; 
import BookForm from "./BookForm.js"; 
import BookList from "./BookList.js"; 
import "../App.css"; 

const AdminView = ({ token }) => {
  const navigate = useNavigate(); 

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
