const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const crypto = require('crypto');

const usersFilePath = path.join(__dirname, 'data', 'users.json');
// Using a consistent secret key, ideally from an environment variable for security
const SECRET_KEY = process.env.SECRET_KEY || 'password123'; // Replace with a more secure value in production

const getUsers = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

const fileAuth = (username, password) => {
  const users = getUsers();
  const user = users.find(user => user.username === username);
  
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  
  return null;
};

// Generate JWT token
const generateJWT = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });  // Token expires in 1 hour
};

// Async function to verify JWT token
const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(new Error('Failed to authenticate token'));  // Reject with error message
      } else {
        resolve(decoded);  // Resolve with decoded payload
      }
    });
  });
};

module.exports = {
  fileAuth,
  generateJWT,
  verifyJWT
};
