const { verifyJWT } = require('../auth');  // Ensure verifyJWT uses async/await

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Get the token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = await verifyJWT(token);  // Wait for the token to be verified
    req.user = decoded;  // Attach the decoded user info to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;
