import React from 'react';
import BookForm from './BookForm'; // Form for adding/editing books
import BookList from './BookList'; // List of books that admins can manage

const AdminView = ({ token }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Add or Edit Books</h3>
      <BookForm token={token} /> {/* Form for adding/editing books */}
      <h3>Books List</h3>
      <BookList token={token} /> {/* Admin can also delete/edit books */}
    </div>
  );
};

export default AdminView;
