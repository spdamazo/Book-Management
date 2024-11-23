import React from 'react';
import BookForm from './BookForm'; // Import the form for adding or editing books
import BookList from './BookList'; // Import the list of books that admins can manage

const AdminView = ({ token }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2> {/* Title of the admin dashboard */}
      <h3>Add or Edit Books</h3> {/* Heading for the add/edit section */}
      
      {/* Render the BookForm component that allows the admin to add or edit a book */}
      <BookForm token={token} /> {/* Pass token for authentication, needed for adding or editing books */}
      
      <h3>Books List</h3> {/* Heading for the books list */}
      
      {/* Render the BookList component that allows the admin to manage (edit/delete) books */}
      <BookList token={token} /> {/* Pass token for authentication, needed for editing/deleting books */}
    </div>
  );
};

export default AdminView;
