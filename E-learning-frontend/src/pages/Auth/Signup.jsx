import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../../../utils";
import { register } from "./AuthApi";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons

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
    passwordVisible: false, // Manage password visibility
    confirmPasswordVisible: false, // Manage confirm password visibility
  });

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    profileImage: Yup.mixed()
      .test("fileRequired", "Profile image is required", (value) => !!value)
      .test(
        "fileType",
        "Unsupported file format. Please upload an image (jpg, jpeg, png).",
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      )
      .test(
        "fileSize",
        "File size is too large. Max size is 2MB.",
        (value) => value && value.size <= 2 * 1024 * 1024
      ),
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
      setInitialState((prevState) => ({
        ...prevState,
        profileImage: file, // Store the selected image in state
      }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setInitialState((prevState) => ({
      ...prevState,
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setInitialState((prevState) => ({
      ...prevState,
      confirmPasswordVisible: !prevState.confirmPasswordVisible,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        profileImage,
        username,
        email,
        mobileNumber,
        gender,
        role,
        password,
        confirmPassword,
      } = initialState;

      // Validate using Yup
      await validationSchema.validate(
        { username, email, mobileNumber, gender, password, confirmPassword, profileImage },
        { abortEarly: false } // Show all errors
      );

      setInitialState((prev) => ({ ...prev, loading: true }));

      // Prepare user data for API request
      const userData = {
        profileImage,
        username,
        email,
        mobileNumber,
        gender,
        role,
        password,
      };

      // Make API call
      const response = await register(userData);

      if (response.ok) {
        handleSuccess(response.msg);
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
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        handleError(response.msg || "Registration failed");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        // Show validation errors
        error.inner.forEach((err) => {
          handleError(err.message);
        });
      } else {
        console.error("Register Error:", error);
        handleError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setInitialState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-teal-950 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Profile Image Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              accept="image/*"
            />
            {initialState.profileImage && (
              <img
                src={URL.createObjectURL(initialState.profileImage)}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 object-cover rounded-full border"
              />
            )}
          </div>

          {/* Username, Email, Phone Number Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
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
              <label className="block text-sm font-medium text-gray-700">Email</label>
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
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
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

          {/* Password and Confirm Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={initialState.passwordVisible ? "text" : "password"}
                  name="password"
                  value={initialState.password}
                  onChange={handleInput}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-teal-600"
                >
                  {initialState.passwordVisible ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={initialState.confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={initialState.confirmPassword}
                  onChange={handleInput}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-2 text-teal-600"
                >
                  {initialState.confirmPasswordVisible ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Gender and Role Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
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
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={initialState.role}
                onChange={handleInput}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
              disabled={initialState.loading}
            >
              {initialState.loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600">
              Login
            </Link>
          </span>
        </div>
      </div>

     
    </div>
  );
}

export default Signup;
