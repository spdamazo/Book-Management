import React, { useState } from "react";
import "../App"; 

// SearchBar component for filtering books based on various fields
const SearchBar = ({ onSearch }) => {
  // State to manage search field inputs (title, author, keyword, and publication date)
  const [searchFields, setSearchFields] = useState({
    title: "",
    author: "",
    keyword: "",
    publicationDate: "",
  });

  // Handles changes in any input field and updates the corresponding state
  const handleChange = (e) => {
    const { name, value } = e.target; // Get input name and value from the event
    setSearchFields((prev) => ({
      ...prev,
      [name]: value, // Update the specific field while preserving others
    }));
  };

  // Trigger the search action by sending the current search fields to the parent component
  const handleSearch = () => {
    onSearch(searchFields); // Call the parent function with the current search values
  };

  return (
    <div className="search-bar">
      {/* Input for searching by title */}
      <input
        type="text"
        name="title"
        placeholder="Search by Title"
        value={searchFields.title}
        onChange={handleChange}
        className="search-input"
      />

      {/* Input for searching by author */}
      <input
        type="text"
        name="author"
        placeholder="Search by Author"
        value={searchFields.author}
        onChange={handleChange}
        className="search-input"
      />

      {/* Input for searching by keyword */}
      <input
        type="text"
        name="keyword"
        placeholder="Search by Keyword"
        value={searchFields.keyword}
        onChange={handleChange}
        className="search-input"
      />

      {/* Input for searching by publication date */}
      <input
        type="date"
        name="publicationDate"
        value={searchFields.publicationDate}
        onChange={handleChange}
        className="search-input"
      />

      {/* Search button to initiate the search action */}
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
