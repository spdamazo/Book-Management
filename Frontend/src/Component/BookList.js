import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api"; // Assuming these functions are in your API file

const BookList = ({ token }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (token) {
        await deleteBook(id, token);
        setBooks(books.filter(book => book.id !== id));
      } else {
        alert("You need to be logged in as admin to delete a book.");
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <img src={book.coverImage} alt={book.title} width="100" />
              <p>{book.description}</p>
              {token && (
                <div>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button>Edit</button> {/* Admin can edit here */}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;
