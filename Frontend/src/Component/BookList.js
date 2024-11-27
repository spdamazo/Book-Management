import React, { useEffect, useState } from "react"; 
import SearchBar from "./SearchBar";
import { getBooks, deleteBook } from "../api"; 
import { useNavigate } from "react-router-dom"; 
import "../App.css"; 

const BookList = ({ token, searchQuery, setSearchQuery }) => {
  // State variables to store books, filtered books, loading status, and any errors
  const [books, setBooks] = useState([]); // Holds all books fetched from the API
  const [filteredBooks, setFilteredBooks] = useState([]); // Holds books filtered by search query
  const [loading, setLoading] = useState(true); // Tracks if books are still being loaded
  const [error, setError] = useState(null); // Holds error messages if fetching fails
  const navigate = useNavigate(); // Navigation hook to change routes

  // useEffect to fetch books when the component mounts or the token changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch all books from the API using the provided token
        const data = await getBooks(token);
        setBooks(data); // Set the fetched books to the state
        setFilteredBooks(data); // Initially, show all books in the filtered list
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later."); // Set error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };
    fetchBooks(); // Call fetchBooks to retrieve data
  }, [token]); // Dependencies: fetch books whenever the token changes

  // useEffect to filter books based on the search query
  useEffect(() => {
    if (searchQuery) {
      const { title, author, keyword, publicationDate } = searchQuery;

      // Filter books based on the provided search criteria
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
      // If no search query, show all books
      setFilteredBooks(books);
    }
  }, [searchQuery, books]); // Trigger this effect when searchQuery or books change

  // Function to handle deleting a book
  const handleDelete = async (id) => {
    // Ensure the user is logged in as admin before deleting a book
    if (!token) {
      alert("You need to be logged in as admin to delete a book.");
      return;
    }

    // Confirm with the user before proceeding with deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      // Call deleteBook API to remove the book
      await deleteBook(id, token);
      // Update the book list state by filtering out the deleted book
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again."); // Show an error alert if deletion fails
    }
  };

  // Function to handle editing a book
  const handleEdit = (bookId) => {
    // Navigate to the BookForm page with the bookId to edit the book
    navigate(`/edit/${bookId}`);
  };

  return (
    <div>
      {/* SearchBar component for handling search */}
      <SearchBar onSearch={setSearchQuery} />
      
      {/* Loading state: Show loading message while data is being fetched */}
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        // Error state: Display error message if fetching fails
        <p>{error}</p>
      ) : filteredBooks.length > 0 ? (
        // If books are found, display them in a grid/list format
        <div className="book-list-container">
          {filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              {/* Display book cover image */}
              <img
                src={book.coverImage}
                alt={book.title}
                width="100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/book/${book.id}`)} // Navigate to book details page
              />
              {/* Display book title, clicking it redirects to book details */}
              <h3
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate(`/book/${book.id}`)} // Navigate to book details page
              >
                {book.title}
              </h3>
              <p>{book.author}</p>
              {/* Show delete and edit buttons if user is logged in as admin */}
              {token && (
                <div>
                  <button onClick={() => handleDelete(book.id)}>Delete</button> {/* Delete button */}
                  <button onClick={() => handleEdit(book.id)}>Edit</button> {/* Edit button */}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // If no books match the search query, show a message
        <p>No books match your search criteria.</p>
      )}
    </div>
  );
};

export default BookList;
