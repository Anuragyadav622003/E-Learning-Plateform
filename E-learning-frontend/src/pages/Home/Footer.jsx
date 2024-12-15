// import React from 'react';

// function Footer() {
//   return (
//     <div className="bg-gray-900 text-white">
//       <footer className="footer footer-center p-10">
//         {/* Navigation Links */}
//         <nav className="flex justify-center text-gray-400 space-x-8 mb-6 text-sm sm:text-xl md:text-2xl">
//           <a className="link link-hover ">Courses</a>
//           <a className="link link-hover">About us</a>
//           <a className="link link-hover">Blog</a>
//           <a className="link link-hover">Contact</a>
//         </nav>

//         {/* Social Media Icons */}
//         <div className="flex justify-center space-x-8 mb-6">
//           <a href="https://twitter.com" className="flex flex-col items-center hover:text-blue-400 transition duration-200">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               className="fill-current mb-1"
//             >
//               <path fill='gray' d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//             </svg>
          
//           </a>

//           <a href="https://youtube.com" className="flex flex-col items-center hover:text-red-600 transition duration-200">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               className="fill-current mb-1"
//             >
//               <path fill='gray' d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//             </svg>
          
//           </a>

//           <a href="https://facebook.com" className="flex flex-col items-center hover:text-blue-600 transition duration-200">
//           <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="24"
//   height="24"
//   viewBox="0 0 24 24"
//   className="fill-current mb-1"
// >
//   <path
//     fill="gray"  
//     d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
//   ></path>
// </svg>
        
//           </a>
//         </div>

//         {/* Copyright */}
//         <aside>
//           <p className="text-center text-gray-400 text-sm sm:text-xl md:text-2xl">Copyright © {new Date().getFullYear()} - LearnAcademy. All rights reserved.</p>
//         </aside>
//       </footer>
//     </div>
//   );
// }

// export default Footer;

// Footer.jsx

import React from 'react';
import {  FaInstagram, FaLinkedin,  FaTwitter, FaYoutube } from 'react-icons/fa6';
import { Mail } from 'lucide-react'; 
import { VscLocation } from "react-icons/vsc";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="flex max-w-7xl mx-auto">
        <div className=" max-w-[20%]  mb-4 mx-4">
          <h3 className='font-bold text-2xl'>SKILLSPHERE</h3>
          <p className='text-gray-400 text-xs'>Skilling to empower</p>
        </div>
        <div className="text-gray-400 text-xs max-w-[80%] mx-4">
          <h2>"Empowering individuals with the skills to thrive in a changing world.</h2>
          <h2>UNIVC skilling to empower bridges talent and
            opportunity, driving innovation and growth for a brighter future."</h2>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>

            <h3 className="text-lg font-semibold mt-4">Careers</h3>
            <div className='text-gray-600 cursor-pointer'>
              <div className='flex items-center gap-2'>
                <VscLocation className='text-2xl'/>
                <div className="mt-2 ">Address</div>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='text-xs'/>
                <div className="mt-2 ">skillsphere@.com</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Academics</h3>
            <ul>
              <li className="mt-2 text-gray-600 cursor-pointer">Programme</li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">Innovation</h3>
            <ul>
              <li className="mt-2 text-gray-600 cursor-pointer">Student</li>
              <li className="mt-2 text-gray-600 cursor-pointer">Faculty</li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">Other Links</h3>
            <ul>
              <li className="mt-2 text-gray-600 cursor-pointer">Jobs</li>
              <li className="mt-2 text-gray-600 cursor-pointer">Become A Teacher</li>
              <li className="mt-2 text-gray-600 cursor-pointer">Events</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-start mt-8 space-x-4 text-4xl">
          <a href="#" className="mx-2">
            <FaTwitter />
          </a>
          <a href="#" className="mx-2">
            <FaInstagram />
          </a>
          <a href="#" className="mx-2">
            <FaLinkedin />
          </a>
          <a href="#" className="mx-2">
            <FaYoutube />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;