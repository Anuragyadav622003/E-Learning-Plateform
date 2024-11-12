import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerSvg from "../../assets/Banner.svg";

function Banner() {
  const navigate = useNavigate();
  const [placeholder, setPlaceholder] = useState("example@gmail.com");
  const [role, setRole] = useState(""); // State for selected role

  const handleFocus = () => setPlaceholder("");
  const handleBlur = () => setPlaceholder("example@gmail.com");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleGetStarted = () => {
    if (role === "teacher" || role === "admin") {
      // Navigate to the admin project
      window.location.href = "https://e-learning-plateform-admin.vercel.app/"; // Replace with your admin project URL
    } else {
      // Navigate within the current user project
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-screen-2xl container mx-auto px-8 md:px-20 lg:px-24 py-16 md:h-screen">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 space-y-6 md:space-y-10 text-white pt-10 md:pr-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
          Welcome! Learn something{" "}
          <span className="text-pink-400">new every day!</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300">
          Explore a variety of topics and expand your knowledge with engaging
          content and resources.
        </p>

        {/* Role Selection */}
        <label className="flex flex-col">
          <span className="text-gray-300 font-semibold mb-2">Select your role:</span>
          <select
            value={role}
            onChange={handleRoleChange}
            className="bg-gray-800 text-white rounded-md p-2 border-0 focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" disabled>Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {/* Email Input */}
        <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-8 h-8 text-blue-500"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="flex-grow h-10 font-semibold text-lg text-gray-200 placeholder-gray-400 bg-gray-800 rounded-md p-2 focus:outline-none transition duration-200 ease-in-out"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </label>

        {/* Get Started Button */}
        <button
          className="text-xl font-bold text-black bg-pink-400 hover:bg-pink-500 py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-start mt-6 md:mt-0 sm:pb-16 md:ml-12">
        <img
          src={BannerSvg}
          className="h-auto max-h-full w-full md:min-h-[500px] object-contain rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          alt="Learning Banner"
        />
      </div>
    </div>
  );
}

export default Banner;
