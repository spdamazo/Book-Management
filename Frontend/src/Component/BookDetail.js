import React, { useEffect, useState } from "react";
import { getBookById } from "../api"; // Fetch book details by ID
import { useParams } from "react-router-dom";

const BookDetail = ({ token }) => {
  const { bookId } = useParams(); // Get bookId from the URL
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
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      {book.coverImage && (
        <div style={{ margin: "20px 0" }}>
          <img
            src={book.coverImage}
            alt={book.title}
            style={{
              width: "200px", // Limit the width
              height: "auto", // Maintain aspect ratio
              maxHeight: "300px", // Optional: Limit max height
              objectFit: "cover", // Ensure the image fits within the bounds
            }}
          />
        </div>
      )}
      <p><strong>Publication Date:</strong> {book.publicationDate}</p>
      <p><strong>Description:</strong> {book.description}</p>
      
      
    </div>
  );
};

export default BookDetail;
