import {  Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import React from 'react';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Home from '../pages/Home/Home';
import QuizzScreen from '../pages/Quizz/QuizzScreen';
import QuizzPlay from '../pages/Quizz/QuizzPlay'
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Courses from '../pages/Courses/Courses';
import Profile from '../pages/Profile/Profile';
import { Logout } from '@mui/icons-material';



function ComponentsRouter() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/quizzes' element={<QuizzScreen/>}/>
        <Route path='/quizzPlay' element={<QuizzPlay/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path='/profile' element={<Profile/>}/>
     <Route path='/logout' element={<Logout/>}/>

</Routes>

  
  );
}

export default ComponentsRouter;
