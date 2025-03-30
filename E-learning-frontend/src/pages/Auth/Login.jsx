import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../../../utils";
import { useAuth } from "../../context/context";
import { login, handleGoogleLogin } from "./AuthApi";

function Login() {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Login handler (Google or Email/Password)
  const handleLogin = async (isGoogle = false) => {
    setLoading(true);
    try {
      if (isGoogle) {
        await loginWithRedirect({ connection: "google-oauth2" }); // Redirects to Google login
      } else {
        const response = await login(credentials);
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("accessToken", response.accessToken);
          setUser(response.user);
          setIsLoggedIn(true);
          handleSuccess(response.msg);
          setTimeout(() => navigate("/"), 1000);
        } else {
          handleError(response.msg);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      handleError(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch Google login API after authentication
  // useEffect(() => {
  //   const fetchGoogleLogin = async () => {
  //     if (isAuthenticated && user) {
  //       try {
  //         setLoading(true);
  //         const token = await getAccessTokenSilently(); // Get Google ID token

  //         // Call backend API with Google token
  //         const apiResponse = await handleGoogleLogin(token);

  //         if (apiResponse.ok) {
  //           localStorage.setItem("user", JSON.stringify(apiResponse.user));
  //           localStorage.setItem("accessToken", apiResponse.accessToken);
  //           setUser(apiResponse.user);
  //           setIsLoggedIn(true);
  //           handleSuccess("Google login successful!");
  //           setTimeout(() => navigate("/"), 1000);
  //         } else {
  //           handleError(apiResponse.msg);
  //         }
  //       } catch (error) {
  //         console.error("Google Login Error:", error);
  //         handleError("Google login failed.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchGoogleLogin();
  // }, [isAuthenticated, user]); // Runs only when user logs in with Google

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            className="object-cover w-full h-72 md:h-full"
            src="https://static.vecteezy.com/system/resources/previews/001/410/879/large_2x/e-learning-online-education-futuristic-banner-vector.jpg"
            alt="E-Learning Banner"
          />
        </div>
        <form className="flex flex-col w-full md:w-1/2 p-8 bg-white overflow-hidden" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <h1 className="text-center text-3xl font-bold mb-6 text-teal-950">Login</h1>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInput}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={handleInput}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 pr-10"
                placeholder="Enter your password"
                required
              />
              <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded-md focus:outline-none hover:bg-teal-700 disabled:bg-teal-400" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" onClick={() => handleLogin(true)} className="flex items-center w-full p-2 border rounded-lg shadow-md bg-white hover:bg-gray-200 transition duration-200 mt-4">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Login" className="w-6 h-6 mr-2" />
            <span>Login with Google</span>
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account? <Link to="/signup" className="text-teal-600 hover:underline">Sign up here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
