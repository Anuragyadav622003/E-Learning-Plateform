// src/components/Auth/Signup.js
import React from 'react';
import Banner from './Banner';
import Footer from './Footer';


import Subscribe from '../Subscribe/Subscribe';
import Services from '../Services/Services';
import Hero from './Hero';

const Home = () => {
  return (
    <div className="flex flex-col bg-blue-300 text-black w-screen items-center justify-center min-h-screen ">
      <Banner /> {/* Full width and margin below the banner */}
      <div>
     <Services/>
      </div>
    <div>      
   <Hero/>
    </div>
    <div>
    <Subscribe/>
    </div>

      <div className="w-screen mt-10 bg-gray-900">

        <Footer  /> {/* Dark background, white text, padding */}
      </div>
    </div>
  );
};

export default Home;
