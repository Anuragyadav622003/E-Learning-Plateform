import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { handleError, handleSuccess } from "../../../utils";
import { useAuth } from "../../context/context";
import { login } from "./AuthApi";

function Login() {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
const {setUser,setIsLoggedIn} = useAuth();

  const [initialState, setInitialState] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handling input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInitialState({ ...initialState, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Google login with Auth0
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithRedirect({
        connection: "google-oauth2",
      });
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error(`Google login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Store Google user in localStorage after login
  useEffect(() => {
    const storeUser = async () => {
      if (isAuthenticated && user) {
        console.log("Google User data:", user);
        localStorage.setItem("user", JSON.stringify(user));

        // Fetch Auth0 access token
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem("accessToken", token);
        } catch (error) {
          console.error("Error fetching Auth0 token:", error);
        }

        handleSuccess("Google login successful!");
        await setIsLoggedIn(true);
        setTimeout(() => navigate("/"), 3000);
      }
    };
    storeUser();
  }, [isAuthenticated, user, getAccessTokenSilently, navigate]);

  // Handle manual login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await fetch("http://localhost:5000/api/user/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(initialState),
      // });
  const response =  await login(initialState)

     console.log(response,"ASdadsa")

      if (response.ok) {
        // localStorage.setItem("accessToken", resData.accessToken);
        // localStorage.setItem("refreshToken", resData.refreshToken);

        setInitialState({ email: "", password: "" });
        handleSuccess(response.msg);
        await setIsLoggedIn(true);
        setUser(response.user);
        setTimeout(() => navigate("/"), 2000);
      } else {
        handleError(response.msg);
      }
    } catch (error) {
      console.error("Error during manual login:", error);
      handleError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <form className="flex flex-col w-full md:w-1/2 p-8 bg-white overflow-hidden" onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-bold mb-6 text-teal-950">Login</h1>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={initialState.email}
              onChange={handleInput}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={initialState.password}
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

          {/* Login Button */}
          <button type="submit" className="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded-md focus:outline-none hover:bg-teal-700 disabled:bg-teal-400" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Google Login Button */}
          <button type="button" onClick={handleGoogleLogin} className="flex items-center w-full p-2 border rounded-lg shadow-md bg-white hover:bg-gray-200 transition duration-200 mt-4">
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
      <ToastContainer />
    </div>
  );
}

export default Login;
