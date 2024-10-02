import {  Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import React from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import QuizzScreen from './components/Quizz/QuizzScreen';
import QuizzPlay from './components/Quizz/QuizzPlay'


function ComponentsRouter() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/quizzes' element={<QuizzScreen/>}/>
        <Route path='/quizzPlay' element={<QuizzPlay/>}/>
      </Routes>

  
  );
}

export default ComponentsRouter;
