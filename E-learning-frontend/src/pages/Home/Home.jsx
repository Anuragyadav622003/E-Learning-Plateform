// src/components/Auth/Home.js
import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Subscribe from "../Subscribe/Subscribe";
import Services from "../Services/Services";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="flex flex-col text-black w-full items-center justify-center min-h-screen">
      {/* Hero Section - Full Width */}
      <Banner />

      {/* Services Section */}
      <div className="w-full">
        <Services />
      </div>

      {/* Hero Section */}
      <div className="w-full">
        <Hero />
      </div>

      {/* Subscribe Section - Full Width */}
      <div className="w-full">
        <Subscribe />
        <Footer />
      </div>

     
    </div>
  );
};

export default Home;
