import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { VscLocation } from 'react-icons/vsc';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding Section */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold">SKILLSPHERE</h3>
          <p className="text-gray-400 text-sm mt-1">Skilling to empower</p>
        </div>

        {/* Mission Statement */}
        <div className="col-span-3">
          <h2 className="text-gray-400 text-sm leading-relaxed">
            "Empowering individuals with the skills to thrive in a changing world. UNIVC skilling to empower bridges talent 
            and opportunity, driving innovation and growth for a brighter future."
          </h2>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Us & Careers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <h3 className="text-lg font-semibold mt-4">Careers</h3>
            <div className="text-gray-400 text-sm cursor-pointer">
              <div className="flex items-center gap-2 mt-2">
                <VscLocation className="text-xl" />
                <span>Address</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Mail className="text-lg" />
                <span>skillsphere@.com</span>
              </div>
            </div>
          </div>

          {/* Academics */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Academics</h3>
            <ul className="space-y-2 text-gray-400 text-sm cursor-pointer">
              <li>Programme</li>
            </ul>
          </div>

          {/* Innovation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Innovation</h3>
            <ul className="space-y-2 text-gray-400 text-sm cursor-pointer">
              <li>Student</li>
              <li>Faculty</li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Other Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm cursor-pointer">
              <li>Jobs</li>
              <li>Become A Teacher</li>
              <li>Events</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-start mt-8 space-x-6 text-2xl">
          <a href="#" className="hover:text-gray-400 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
