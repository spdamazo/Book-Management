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
        // Fetch books using the provided token for authorization
        const data = await getBooks(token);
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
          // Check if the book matches the search criteria
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

          // Return true if all conditions match
          return (
            matchesTitle &&
            matchesAuthor &&
            matchesKeyword &&
            matchesPublicationDate
          );
        })
      );
    } else {
      // If no search query, show all books
      setFilteredBooks(books);
    }
  }, [searchQuery, books]); // Trigger when searchQuery or books change

  // Handle deleting a book
  const handleDelete = async (id) => {
    if (!token) {
      alert("You need to be logged in as admin to delete a book.");
      return; // If user is not logged in, show alert and return
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return; // If user cancels, return without deleting

    try {
      // Call the deleteBook function from the API and pass the book ID and token
      await deleteBook(id, token);
      // Remove the deleted book from the state by filtering it out
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again."); // Show error if deletion fails
    }
  };

  // Handle navigating to the edit page for a book
  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`); // Navigate to the edit page for the specific book
  };

  // Handle navigating to the detailed view of a book
  const handleView = (bookId) => {
    navigate(`/book/${bookId}`); // Navigate to the book's detail page
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} /> {/* Render the SearchBar and pass setSearchQuery to it */}
      
      {/* Conditional rendering based on loading, error, and filteredBooks */}
      {loading ? (
        <p>Loading books...</p> // Show loading message while data is being fetched
      ) : error ? (
        <p>{error}</p> // Show error message if there's an issue fetching books
      ) : filteredBooks.length > 0 ? (
        <ul>
          {/* Render the filtered list of books */}
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {/* If the book has a cover image, display it */}
              {book.coverImage && (
                <img src={book.coverImage} alt={book.title} width="100" />
              )}
              <p>{book.description}</p>
              <p>Publication Date: {book.publicationDate}</p>
              <button onClick={() => handleView(book.id)}>View</button> {/* View button */}
              {token && ( // Only show these buttons if the user is logged in (admin)
                <div>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button onClick={() => handleEdit(book.id)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books match your search criteria.</p> // Show message if no books match the search
      )}
    </div>
  );
};

export default BookList;
