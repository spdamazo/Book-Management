import React, { useEffect, useState } from "react";
import { getBookById } from "../api"; // Function to fetch book details by ID from the API
import { useParams } from "react-router-dom"; // Hook to extract URL parameters (e.g., bookId)

const BookDetail = ({ token }) => {
  const { bookId } = useParams(); // Extract the bookId from the URL parameters (this is used to fetch book details)
  const [book, setBook] = useState(null); // State to store the fetched book details
  const [loading, setLoading] = useState(true); // State to track the loading state
  const [error, setError] = useState(null); // State to store any errors that occur during the fetch

  // Fetch book details when the component mounts or when bookId/token change
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await getBookById(bookId, token); // Fetch the book details using the bookId and token
        setBook(bookData); // Store the fetched book data in the state
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to fetch book details. Please try again later."); // Handle any errors by setting an error message
      } finally {
        setLoading(false); // Stop loading after data fetch attempt (whether successful or not)
      }
    };

    fetchBookDetails(); // Call the fetch function
  }, [bookId, token]); // Dependency array: rerun the effect when bookId or token changes

  // Display a loading message while the book details are being fetched
  if (loading) {
    return <p>Loading book details...</p>;
  }

  // Display an error message if there was an issue fetching the book details
  if (error) {
    return <p>{error}</p>;
  }

  // Display a message if no book was found for the given bookId
  if (!book) {
    return <p>Book not found.</p>;
  }

  // Once the data is fetched, render the book details
  return (
    <div>
      <h2>{book.title}</h2> {/* Display the title of the book */}
      <p><strong>Author:</strong> {book.author}</p> {/* Display the author of the book */}
      
      {/* Display the cover image if it exists */}
      {book.coverImage && (
        <div style={{ margin: "20px 0" }}>
          <img
            src={book.coverImage} // Set the cover image source
            alt={book.title} // Set the alt text for the image
            style={{
              width: "200px", // Limit the width of the image
              height: "auto", // Maintain the image's aspect ratio
              maxHeight: "300px", // Optionally, limit the image height
              objectFit: "cover", // Ensure the image fits within the container bounds
            }}
          />
        </div>
      )}

      <p><strong>Publication Date:</strong> {book.publicationDate}</p> {/* Display the publication date */}
      <p><strong>Description:</strong> {book.description}</p> {/* Display the description of the book */}
    </div>
  );
};

export default BookDetail;
