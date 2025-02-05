import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Authorization middleware
export const authorize = (req, res, next) => {
  console.log("authorization");
  
  // Retrieve token from Authorization header (header name should be lowercase)
  const authHeader = req.headers['authorization']; // 'authorization' should be lowercase
  console.log("authorization header", authHeader);

  // Extract token if available
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// Route that requires authorization
router.get('/check', authorize, (req, res) => {
  res.json({ message: 'User is authorized', user: req.user });
});

export default router; // Export the router, not the middleware directly
