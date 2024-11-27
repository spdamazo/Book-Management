import axios from 'axios';
import API_BASE_URL from './apiConfig'; // Base URL from apiConfig.js

// Login function: Authenticates the user and retrieves a token
export const login = async (username, password) => {
  try {
    // Make a POST request to the login endpoint with the username and password
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data; // Return the token or response data if login is successful
  } catch (error) {
    // In case of an error, throw a new error with the error message
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Fetch all books: This function retrieves a list of books for both users and guests
export const getBooks = async (token) => {
  try {
    // Make a GET request to fetch all books, passing the token in the headers for authorization
    const response = await axios.get(`${API_BASE_URL}/books`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Returns the list of books
  } catch (error) {
    // Throw an error if the request fails, providing the response error message or a general message
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch a specific book by ID: This function fetches details of a single book
export const getBookById = async (id, token) => {
  try {
    // Make a GET request to fetch the book by its ID, passing the token in the headers for authorization
    const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Returns details of the single book
  } catch (error) {
    // Throw an error if the request fails, providing the response error message or a general message
    throw error.response ? error.response.data : error.message;
  }
};

// Add a new book: This function allows the admin to add a new book
export const addBook = async (bookData, token) => {
  try {
    // Ensure that the token is provided (only admin can add books)
    if (!token) {
      throw new Error("No token provided");
    }

    // Make a POST request to add a new book, passing the token in the headers for authorization
    const response = await axios.post(`${API_BASE_URL}/books`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for admin authorization
      },
    });
    return response.data; // Returns the added book's data
  } catch (error) {
    // Throw an error if the request fails, providing the response error message or a general message
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// Update a book: This function allows the admin to update book details
export const updateBook = async (id, bookData, token) => {
  try {
    // Make a PUT request to update a specific book by its ID, passing the token in the headers for authorization
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, bookData, {
      headers: { Authorization: `Bearer ${token}` }, // Include the token for admin authorization
    });
    return response.data; // Returns the updated book data
  } catch (error) {
    // Log the error and throw an error if the update request fails
    console.error('Error adding/updating book:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a book: This function allows the admin to delete a book
export const deleteBook = async (id, token) => {
  try {
    // Make a DELETE request to remove a book by its ID, passing the token in the headers for authorization
    await axios.delete(`${API_BASE_URL}/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // Include the token for admin authorization
    });
  } catch (error) {
    // Log the error and throw an error if the delete request fails
    console.error('Error deleting book:', error);
    throw error.response ? error.response.data : error.message;
  }
};

