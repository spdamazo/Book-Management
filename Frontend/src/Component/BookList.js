import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api"; // Assuming these functions are in your API file

const BookList = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks(token); // Pass token here
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [token]); // Trigger re-fetch if token changes

  // Handle book deletion
  const handleDelete = async (id) => {
    if (!token) {
      alert("You need to be logged in as admin to delete a book.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id, token); // Pass token to deleteBook API
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {book.coverImage && (
                <img src={book.coverImage} alt={book.title} width="100" />
              )}
              <p>{book.description}</p>
              {token && (
                <div>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button>Edit</button> {/* Placeholder for edit functionality */}
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
