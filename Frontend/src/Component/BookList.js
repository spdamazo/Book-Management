import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar"; // Import the search bar
import { getBooks, deleteBook } from "../api";
import { useNavigate } from "react-router-dom";

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

    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id, token);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again.");
    }
  };

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
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {book.coverImage && (
                <img src={book.coverImage} alt={book.title} width="100" />
              )}
              <p>{book.description}</p>
              <p>Publication Date: {book.publicationDate}</p>
              {token && (
                <div>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button onClick={() => handleEdit(book.id)}>Edit</button>
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
