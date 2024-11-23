import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchFields, setSearchFields] = useState({
    title: "",
    author: "",
    keyword: "",
    publicationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(searchFields); // Pass all search fields to the parent component
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        name="title"
        placeholder="Search by Title"
        value={searchFields.title}
        onChange={handleChange}
        style={{ margin: "5px", padding: "5px", width: "200px" }}
      />
      <input
        type="text"
        name="author"
        placeholder="Search by Author"
        value={searchFields.author}
        onChange={handleChange}
        style={{ margin: "5px", padding: "5px", width: "200px" }}
      />
      <input
        type="text"
        name="keyword"
        placeholder="Search by Keyword"
        value={searchFields.keyword}
        onChange={handleChange}
        style={{ margin: "5px", padding: "5px", width: "200px" }}
      />
      <input
        type="date"
        name="publicationDate"
        value={searchFields.publicationDate}
        onChange={handleChange}
        style={{ margin: "5px", padding: "5px" }}
      />
      <button onClick={handleSearch} style={{ margin: "5px", padding: "5px" }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
