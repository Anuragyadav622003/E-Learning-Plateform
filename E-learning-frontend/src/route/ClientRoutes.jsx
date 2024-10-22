import {  Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import React from 'react';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Home from '../pages/Home/Home';
import QuizzScreen from '../pages/Quizz/QuizzScreen';
import QuizzPlay from '../pages/Quizz/QuizzPlay'
import ForgotPassword from '../pages/Auth/ForgotPassword';


function ComponentsRouter() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/quizzes' element={<QuizzScreen/>}/>
        <Route path='/quizzPlay' element={<QuizzPlay/>}/>
      </Routes>

  
  );
}

export default ComponentsRouter;
