
import express from 'express';

const router = express.Router();
import jwt from 'jsonwebtoken';

 const authorize = (req, res, next) => {
    
  // Retrieve token from Authorization header
  const authHeader = req.headers['Authorization']; // 'authorization' should be lowercase
  const token = authHeader && authHeader.split(' ')[1];


  // Check if token is present
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

router.get('/check',authorize,(req,res)=>{
  
    res.json({ message: 'User is authorized', user: req.user });

});

export default router;