import React, { useEffect, useState } from "react";
import { getBookById } from "../api";
import { useParams } from "react-router-dom";
import "../App.css";

const BookDetail = ({ token }) => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await getBookById(bookId, token);
        setBook(bookData);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to fetch book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId, token]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>

      {book.coverImage && (
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            style={{
              width: "200px",
              height: "auto",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <p>
        <strong>Publication Date:</strong> {book.publicationDate}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
    </div>
  );
};

export default BookDetail;
