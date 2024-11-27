import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate hooks to handle routing and URL params
import { addBook, updateBook, getBookById } from "../api"; // Import API functions for adding, updating, and fetching book data
import "../App.css";

const BookForm = ({ token, onSuccess }) => {
  const { bookId } = useParams(); // Get the bookId from the URL parameters (if editing an existing book)
  const navigate = useNavigate(); // Hook to navigate between routes
  // State variables to hold the form input values for the book
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [error, setError] = useState(null); // State to hold any error messages

  // Fetch book data if we are editing an existing book (based on bookId)
  useEffect(() => {
    if (bookId) {
      const fetchBookData = async () => {
        try {
          const data = await getBookById(bookId, token); // Fetch book data from the API using bookId and token
          // Set form fields with the fetched book data
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
          setPublicationDate(data.publicationDate);
          setCoverImage(data.coverImage);
        } catch (err) {
          console.error("Error fetching book data:", err);
          setError("Failed to load book data."); // Set error message if data fetching fails
        }
      };
      fetchBookData(); // Call the fetchBookData function
    }
  }, [bookId, token]); // Fetch data when bookId or token changes

  // Handle form submission to either add or update a book
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!token) {
      setError("You must be logged in to add or update a book."); // Show error if no token (not logged in)
      return;
    }

    // Create an object with the book data to be sent to the API
    const bookData = { title, author, description, publicationDate, coverImage };

    try {
      if (bookId) {
        // If bookId is provided, update the existing book
        await updateBook(bookId, bookData, token);
        alert("Book updated successfully!"); // Show success message for updating
      } else {
        // If no bookId, add a new book
        await addBook(bookData, token);
        alert("Book added successfully!"); // Show success message for adding
      }
      
      // Call the onSuccess callback after successful addition or update
      if (onSuccess) onSuccess();
      navigate("/books"); // Navigate to the book list page after success
    } catch (err) {
      console.error("Error adding/updating book:", err);
      setError("An error occurred while saving the book. Please try again."); // Show error message if API call fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form-container"> {/* Form submission triggers handleSubmit */}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state on input change
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          placeholder="Enter author's name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)} // Update author state on input change
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter book description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update description state on input change
        />
      </div>
      <div>
        <label htmlFor="publicationDate">Publication Date:</label>
        <input
          id="publicationDate"
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)} // Update publicationDate state on input change
        />
      </div>
      <div>
        <label htmlFor="coverImage">Cover Image URL:</label>
        <input
          id="coverImage"
          type="url"
          placeholder="Enter cover image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)} // Update coverImage state on input change
        />
      </div>
      <button type="submit">{bookId ? "Update Book" : "Add Book"}</button> {/* Button text depends on whether bookId exists */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if there is an error */}
    </form>
  );
};

export default BookForm;
