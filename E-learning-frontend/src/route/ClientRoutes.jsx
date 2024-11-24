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
import CourseDetails from '../pages/Courses/CourseDetails';
import CourseContent from '../pages/Courses/CourseContent';



function ComponentsRouter() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/quizzes' element={<QuizzScreen/>}/>
        <Route path='/quizzes/:id' element={<QuizzPlay/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/course/:id" element={<CourseDetails/>} />
        <Route path="/course/:id/content" element={<CourseContent/>} />
        <Route path='/profile' element={<Profile/>}/>
     <Route path='/logout' element={<Logout/>}/>

</Routes>

  
  );
}

export default ComponentsRouter;
