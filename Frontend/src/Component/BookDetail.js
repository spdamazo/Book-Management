import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { getBookById } from "../api"; // Import function to fetch book details by ID from the API
import { useParams } from "react-router-dom"; // Import useParams hook to access URL parameters
import "../App.css"; // Import custom CSS for styling

const BookDetail = ({ token }) => {
  // Extract bookId from the URL parameters using useParams hook
  const { bookId } = useParams(); 
  // State to store the book details, loading state, and error message
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch the book details when the component mounts or when bookId or token changes
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetch book details by ID using the token for authentication
        const bookData = await getBookById(bookId, token);
        setBook(bookData); // Set the fetched book data to the book state
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to fetch book details. Please try again later."); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchBookDetails(); // Call the function to fetch book details
  }, [bookId, token]); // Dependencies: fetch when bookId or token changes

  // If the data is still loading, display loading message
  if (loading) {
    return <p>Loading book details...</p>;
  }

  // If an error occurs during fetching, display the error message
  if (error) {
    return <p>{error}</p>;
  }

  // If the book is not found, show a "Book not found" message
  if (!book) {
    return <p>Book not found.</p>;
  }

  // Render the book details once the data is loaded successfully
  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2> {/* Display book title */}
      <p>
        <strong>Author:</strong> {book.author} {/* Display book author */}
      </p>

      {/* Display the book's cover image if it exists */}
      {book.coverImage && (
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            style={{
              width: "200px",
              height: "auto",
              maxHeight: "300px",
              objectFit: "cover", // Ensure the image is properly scaled and cropped
            }}
          />
        </div>
      )}

      <p>
        <strong>Publication Date:</strong> {book.publicationDate} {/* Display publication date */}
      </p>
      <p>
        <strong>Description:</strong> {book.description} {/* Display book description */}
      </p>
    </div>
  );
};

export default BookDetail;
