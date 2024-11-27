import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { getBooks, deleteBook } from "../api";
import { useNavigate } from "react-router-dom";
import "../App.css";

const BookList = ({ token, searchQuery, setSearchQuery }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks(token);
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [token]);

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
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  const handleDelete = async (id) => {
    if (!token) {
      alert("You need to be logged in as admin to delete a book.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(id, token);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again.");
    }
  };

  // Navigate to BookForm for editing
  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredBooks.length > 0 ? (
        <div className="book-list-container">
          {filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <img
                src={book.coverImage}
                alt={book.title}
                width="100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/book/${book.id}`)} // View book details
              />
              <h3
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate(`/book/${book.id}`)} // View book details
              >
                {book.title}
              </h3>
              <p>{book.author}</p>
              {token && (
                <div>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button onClick={() => handleEdit(book.id)}>Edit</button> {/* Edit button */}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No books match your search criteria.</p>
      )}
    </div>
  );
};

export default BookList;
