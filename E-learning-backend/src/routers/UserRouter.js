// routes/userRoutes.js
import express from 'express';
import { loginUser, registerUser } from '../controllers/User.controller.js';
import upload from '../middlewares/multer.middleware.js';



const router = express.Router();

// Register route
router.post('/register',  upload.fields(
  [{ name: "profileimage", maxCount: 1 }]
 
) , registerUser);

// Login route
router.post('/login',loginUser);

export default router;
