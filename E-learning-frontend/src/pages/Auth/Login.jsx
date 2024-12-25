import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { handleError, handleSuccess } from "../../../utils";
function Login() {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState({
    
    email: "",
    password: "",
    
  });

  //handling the input value
 const handleInput = (e) => {
  // console.log(e)
  let name = e.target.name;
  let value = e.target.value;

  setInitialState({
    ...initialState,
    [name]: value,
  });
};
  // State to store email, password, error message, and loading status
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithRedirect({ connection: 'google-oauth2' });
    } catch (error) {
      console.error('Error during Google login:', error);
      setError(Google login failed: ${error.message});
      toast.error(Google login failed: ${error.message});
    } finally {
      setLoading(false);
    }
  };
  

  // Store authenticated user in localStorage when using Google login
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Google User data:', user);
      localStorage.setItem('user', JSON.stringify(user));
      try {
        login({ email: user.email, password: 'google-authenticated' });
      } catch (error) {
        console.error('Error during Google user login:', error);
      }
    }
  }, [isAuthenticated, user]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission for manual login
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form default submission
    // setError('');  // Reset error state
    // setLoading(true);  // Set loading state

    // Basic validation
    // if (!email.includes('@') || password.length < 6) {
    //   setError('Please enter a valid email and a password with at least 6 characters.');
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(http://localhost:5000/api/user/login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialState),
    });
    const res_data=await response.json();
    console.log("response data from server",{res_data});
    
       // For development, store tokens in localStorage
       localStorage.setItem("accessToken", res_data.accessToken);
       localStorage.setItem("refreshToken", res_data.refreshToken);
 
    
    if (response.ok) {
      // localStorage.setItem("token",res_data.token);
      // storeTokenInLS(res_data.token)
      setInitialState({
       
        email: "",
        
        password: "",
        });
      handleSuccess(res_data.msg)
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
    else{
  handleError(res_data.msg)
    }
  
  } catch (error) {
      console.error('Error during manual login:', error);
     
    } 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            className="object-cover w-full h-72 md:h-full"
            src="https://static.vecteezy.com/system/resources/previews/001/410/879/large_2x/e-learning-online-education-futuristic-banner-vector.jpg"
            alt="E-Learning Banner"
          />
        </div>
        <form
          className="flex flex-col w-full md:w-1/2 p-8 bg-white overflow-hidden"
          style={{ maxHeight: '90vh' }}
          onSubmit={handleSubmit} // Form submission handled here
        >
          <h1 className="text-center text-3xl font-bold mb-6 text-teal-950">Login</h1>

          {/* Error Message */}
          {/* {error && <div className="mb-4 text-red-600 text-center">{error}</div>} */}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Email</label>
            <input
            name="email"
              type="email"
              value={initialState.email}
              onChange={handleInput} // Update state on input change
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
                type={showPassword ? 'text' : 'password'}
                value={initialState.password}
                onChange={handleInput} // Update state on input change
                className="block w-full rounded-md border border-gray-300 py-2 px-3 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="mb-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded-md focus:outline-none hover:bg-teal-700 disabled:bg-teal-400"
          >
            Login
          </button>
          </div>

          {/* OR Divider */}
          <div className="text-center mb-4">
            <span className="text-gray-600">or</span>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center w-full p-2 border rounded-lg shadow-md bg-white hover:bg-gray-200 transition duration-200"
          >
            <img
              src="https://th.bing.com/th/id/R.0dd54f853a1bffb0e9979f8146268af3?rik=qTQlRtQRV5AliQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-google-logo-icon-png-transparent-background-1000.png&ehk=VlcCHZ7jyV%2fCI7dZfbUl8Qb9%2f7uibkF6I6MBoqTtpRU%3d&risl=&pid=ImgRaw&r=0"
              alt="Google Login"
              className="w-8 h-8 mr-2"
            />
            <span>Login with Google</span>
          </button>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-teal-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;