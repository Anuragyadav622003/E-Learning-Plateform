import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import userRoutes from './src/routers/UserRouter.js';
import quizzRoutes from './src/routers/QuizzRouter.js';
import dashboardRoutes from './src/routers/AdminRouter.js';
import  authorizRouter  from './src/routers/AuthorizRouter.js';




dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET || 'your-default-secret'));



app.get('/',(req,res)=>{
  res.send('hello world')
});

//authorizarion for each action
app.use('/api/authorize',authorizRouter); 


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
