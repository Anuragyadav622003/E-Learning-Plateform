import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Assuming you're using React Router for navigation

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory(); // For navigation

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Example logout logic (e.g., Firebase, JWT, etc.)
      // If using Firebase, you can call:
      // await firebase.auth().signOut();
      
      // Clear any user data (e.g., localStorage, sessionStorage)
      localStorage.removeItem("userData");
      
      // After successful logout, redirect to login page
      setMessage("You have been logged out successfully!");
      setLoading(false);
      setTimeout(() => {
        history.push("/login"); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Logout</h1>
        {message && (
          <p className="mt-4 text-xl text-green-500 dark:text-green-300">{message}</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md text-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default Logout;
