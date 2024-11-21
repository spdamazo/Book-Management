import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { addBook, updateBook, getBookById } from "../api";

const BookForm = ({ token, onSuccess }) => {
  const { bookId } = useParams(); // Get bookId from the URL parameters
  const navigate = useNavigate(); // Use the navigate hook
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [error, setError] = useState(null);

  // Fetch book data if editing an existing book
  useEffect(() => {
    if (bookId) {
      const fetchBookData = async () => {
        try {
          const data = await getBookById(bookId, token); // Fetch book by ID
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
          setPublicationDate(data.publicationDate);
          setCoverImage(data.coverImage);
        } catch (err) {
          console.error("Error fetching book data:", err);
          setError("Failed to load book data.");
        }
      };
      fetchBookData();
    }
  }, [bookId, token]); // Fetch data when bookId changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in to add or update a book.");
      return;
    }

    const bookData = { title, author, description, publicationDate, coverImage };

    try {
      if (bookId) {
        // Update existing book if bookId is provided
        await updateBook(bookId, bookData, token);
        alert("Book updated successfully!");
      } else {
        // Add a new book if no bookId is provided
        await addBook(bookData, token);
        alert("Book added successfully!");
      }
      
      // Navigate to the book list page after success
      if (onSuccess) onSuccess();
      navigate("/books"); // Redirect to BookList after adding/updating book
    } catch (err) {
      console.error("Error adding/updating book:", err);
      setError("An error occurred while saving the book. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          placeholder="Enter author's name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter book description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="publicationDate">Publication Date:</label>
        <input
          id="publicationDate"
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="coverImage">Cover Image URL:</label>
        <input
          id="coverImage"
          type="url"
          placeholder="Enter cover image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>
      <button type="submit">{bookId ? "Update Book" : "Add Book"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default BookForm;
