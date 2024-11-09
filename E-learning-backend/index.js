import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import userRoutes from './src/routers/User.router.js';
import quizzRoutes from './src/routers/Quizz.router.js';
import dashboardRoutes from './src/routers/Admin.router.js'







dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

z
app.get('/',(req,res)=>{
  res.send('hello world')
});


app.use('/api/user',userRoutes);
app.use('/api/quizz',quizzRoutes);

// Admin

// Admin Dashboard routes
app.use('/admin',dashboardRoutes);
// app.use('/admin/create')


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
