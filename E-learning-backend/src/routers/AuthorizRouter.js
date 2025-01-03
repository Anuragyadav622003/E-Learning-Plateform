
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

 const authorize = (req, res, next) => {
      console.log("authorization");
  // Retrieve token from Authorization header
  const authHeader = req.headers['Authorization']; // 'authorization' should be lowercase
  console.log("authorization",authHeader);
  const token = authHeader && authHeader.split(' ')[1];
   console.log(token)
let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc1MzZhODljNTFjZTZiZTJiZDFmYjEiLCJlbWFpbCI6ImFudXJhZ3lhZGF2NjIyMDAzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQW51cmFneWFkYXY2MjIwMDMiLCJmdWxsTmFtZSI6IkFudXJhZ3lhZGF2NjIyMDAzIiwiaWF0IjoxNzM1NzU1Mjk5LCJleHAiOjE3MzU3NTYxOTl9.X-EyuVHqfQgecbY_vdaMShYwGAajeD9Ez-MngEpSheY"
  // Check if token is present
  if (!token1) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

router.get('/check',authorize,(req,res)=>{
  
    res.json({ message: 'User is authorized', user: req.user });

});

export default authorize;