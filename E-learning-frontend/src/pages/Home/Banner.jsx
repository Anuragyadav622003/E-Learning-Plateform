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
