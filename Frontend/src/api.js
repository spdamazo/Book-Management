import axios from 'axios';
import API_BASE_URL from './apiConfig'; // Base URL from apiConfig.js

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data; // Return the token or response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Fetch all books (for all users including guests)
export const getBooks = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Returns the list of books
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch book by ID (for all users including guests)
export const getBookById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Returns details of the single book
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Add a new book (admin only)
export const addBook = async (bookData, token) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await axios.post(`${API_BASE_URL}/books`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is sent
      },
    });
    return response.data; // Returns the added book's data
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};


// Update a book (admin only)
export const updateBook = async (id, bookData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, bookData, {
      headers: { Authorization: `Bearer ${token}` }, // Pass the token
    });
    return response.data; // Returns the updated book data
  } catch (error) {
    console.error('Error adding/updating book:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a book (admin only)
export const deleteBook = async (id, token) => {
  try {
    await axios.delete(`${API_BASE_URL}/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // Include the token in headers
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error.response ? error.response.data : error.message;
  }
};
