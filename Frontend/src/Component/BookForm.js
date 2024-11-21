import React, { useState } from "react";
import { addBook, updateBook } from '../api';

const BookForm = ({ token, bookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, description, publicationDate, coverImage };

    try {
      if (bookId) {
        // If bookId is passed, it's an update
        await updateBook(bookId, bookData, token);
      } else {
        // If no bookId, it's an add
        await addBook(bookData, token);
      }
    } catch (error) {
      console.error("Error adding/updating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={publicationDate}
        onChange={(e) => setPublicationDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />
      <button type="submit">{bookId ? "Update Book" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;
