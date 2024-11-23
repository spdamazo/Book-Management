import React, { useState } from "react";

// SearchBar component allows users to search for books based on multiple fields (title, author, keyword, publication date)
const SearchBar = ({ onSearch }) => {
  // State to hold the values for each search field (title, author, keyword, and publicationDate)
  const [searchFields, setSearchFields] = useState({
    title: "",
    author: "",
    keyword: "",
    publicationDate: "",
  });

  // Handle input changes in any of the search fields and update the corresponding state
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target (input field)
    
    // Update the corresponding search field state (title, author, keyword, publicationDate)
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the search action by passing the current search fields to the parent component
  const handleSearch = () => {
    onSearch(searchFields); // Pass the current search field values to the parent component (via the onSearch prop)
  };

  return (
    <div style={{ margin: "20px 0" }}>
      {/* Input field for searching by title */}
      <input
        type="text"
        name="title" // Set the name attribute to "title" for the title search field
        placeholder="Search by Title" // Placeholder text for the input field
        value={searchFields.title} // Bind the value of the input field to the state
        onChange={handleChange} // Update the state when the user types in the input field
        style={{ margin: "5px", padding: "5px", width: "200px" }} // Inline styling for the input field
      />
      
      {/* Input field for searching by author */}
      <input
        type="text"
        name="author" // Set the name attribute to "author" for the author search field
        placeholder="Search by Author"
        value={searchFields.author}
        onChange={handleChange}
        style={{ margin: "5px", padding: "5px", width: "200px" }}
      />
      
      {/* Input field for searching by keyword */}
      <input
        type="text"
        name="keyword" // Set the name attribute to "keyword" for the keyword search field
        placeholder="Search by Keyword"
        value={searchFields.keyword}
        onChange={handleChange}
        style={{ margin: "5px", padding: "5px", width: "200px" }}
      />
      
      {/* Input field for searching by publication date */}
      <input
        type="date"
        name="publicationDate" // Set the name attribute to "publicationDate" for the publication date search field
        value={searchFields.publicationDate} // Bind the value of the input field to the state
        onChange={handleChange} // Update the state when the user selects a publication date
        style={{ margin: "5px", padding: "5px" }}
      />
      
      {/* Button to trigger the search action */}
      <button onClick={handleSearch} style={{ margin: "5px", padding: "5px" }}>
        Search {/* Button text */}
      </button>
    </div>
  );
};

export default SearchBar;
