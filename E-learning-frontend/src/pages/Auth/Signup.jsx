import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../../../utils";

function Signup() {
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState({
    profileImage: null,
    username: "",
    email: "",
    mobileNumber: "",
    gender: "",
    role: "admin", // Default to 'admin'
    password: "",
    confirmPassword: "",
    loading: false,
    error: "",
  });

  // Handle input value changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInitialState((prevState) => ({
          ...prevState,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { password, confirmPassword, ...userData } = initialState;

      // Check if passwords match
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // Make API call
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, password }),
      });

      const resData = await response.json();

      if (response.ok) {
        handleSuccess(resData.msg);
        setInitialState({
          profileImage: null,
          username: "",
          email: "",
          mobileNumber: "",
          gender: "",
          role: "admin",
          password: "",
          confirmPassword: "",
          loading: false,
          error: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        handleError(resData.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      handleError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-teal-950 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={initialState.username}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={initialState.email}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={initialState.mobileNumber}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={initialState.password}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={initialState.confirmPassword}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={initialState.gender}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={initialState.role}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded-md focus:outline-none hover:bg-teal-700 disabled:bg-teal-400"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
