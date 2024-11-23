import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { getBooks, deleteBook } from "../api"; // Import API functions to fetch books and delete a book
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for routing

const BookList = ({ token, searchQuery, setSearchQuery }) => {
  // State to hold the list of all books, filtered books, loading state, and error state
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Fetch books from the API when the component mounts or the token changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks(token); // Fetch books using the provided token for authorization
        setBooks(data); // Store the fetched books in the state
        setFilteredBooks(data); // Initially, set filteredBooks to all books
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later."); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after data fetching completes
      }
    };
    fetchBooks(); // Call the fetchBooks function
  }, [token]); // Dependency array ensures books are fetched when the token changes

  // Filter the books based on searchQuery whenever searchQuery or books change
  useEffect(() => {
    if (searchQuery) {
      const { title, author, keyword, publicationDate } = searchQuery;

      setFilteredBooks(
        books.filter((book) => {
          const matchesTitle = title
            ? book.title.toLowerCase().includes(title.toLowerCase())
            : true;
          const matchesAuthor = author
            ? book.author.toLowerCase().includes(author.toLowerCase())
            : true;
          const matchesKeyword = keyword
            ? book.description.toLowerCase().includes(keyword.toLowerCase())
            : true;
          const matchesPublicationDate = publicationDate
            ? book.publicationDate === publicationDate
            : true;

          return (
            matchesTitle &&
            matchesAuthor &&
            matchesKeyword &&
            matchesPublicationDate
          );
        })
      );
    } else {
      setFilteredBooks(books); // If no search query, show all books
    }
  }, [searchQuery, books]);

  // Handle deleting a book
  const handleDelete = async (id) => {
    if (!token) {
      alert("You need to be logged in as admin to delete a book.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id, token); // Call the deleteBook function
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id)); // Update the state
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again.");
    }
  };

  // Handle navigating to the detailed view of a book
  const handleView = (bookId) => {
    navigate(`/book/${bookId}`); // Navigate to the book's detail page
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} /> {/* Render the SearchBar */}
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredBooks.length > 0 ? (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              {/* Add onClick to the image and title */}
              <img
                src={book.coverImage}
                alt={book.title}
                width="100"
                style={{ cursor: "pointer" }}
                onClick={() => handleView(book.id)} // Navigate to detail page when clicked
              />
              <h3
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => handleView(book.id)} // Navigate to detail page when clicked
              >
                {book.title}
              </h3>
              <p>{book.author}</p>
              {token && (
                <div>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button onClick={() => handleView(book.id)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books match your search criteria.</p>
      )}
    </div>
  );
};

export default BookList;
