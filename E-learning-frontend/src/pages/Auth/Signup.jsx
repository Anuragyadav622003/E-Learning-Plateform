import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from './AuthApi';

// Initial state for the form
const initialState = {
  profileImage: null,
  username: '',
  email: '',
  mobileNumber: '',
  gender: '',
  role: 'admin', // Default to 'admin'
  password: '',
  confirmPassword: '',
  loading: false,
  error: '',
};

// Reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    case 'SET_ERROR':
      return { ...state, error: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Mock function to simulate checking if the email exists
const checkIfEmailExists = async (email) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email === 'test@example.com'); // Example email already exists
    }, 500);
  });
};

function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: 'SET_FIELD', field: 'profileImage', value: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: 'SET_ERROR', value: '' });

    // Validation checks
    if (!state.username || !state.email || !state.mobileNumber || !state.gender || !state.password || !state.confirmPassword) {
      dispatch({ type: 'SET_ERROR', value: 'All fields are required.' });
      dispatch({ type: 'SET_LOADING', value: false });
      return;
    }

    // Username length check
    if (state.username.length < 3 || state.username.length > 20) {
      dispatch({ type: 'SET_ERROR', value: 'Username must be between 3 and 20 characters long.' });
      dispatch({ type: 'SET_LOADING', value: false });
      return;
    }

    // Password strength check
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    if (!passwordPattern.test(state.password)) {
      dispatch({ type: 'SET_ERROR', value: 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.' });
      dispatch({ type: 'SET_LOADING', value: false });
      return;
    }

    // Check if passwords match
    if (state.password !== state.confirmPassword) {
      dispatch({ type: 'SET_ERROR', value: 'Passwords do not match.' });
      dispatch({ type: 'SET_LOADING', value: false });
      return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(state.email)) {
      dispatch({ type: 'SET_ERROR', value: 'Invalid email format.' });
      dispatch({ type: 'SET_LOADING', value: false });
      return;
    }

    // Validate mobile number format (e.g., 10 digits)
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(state.mobileNumber)) {
      dispatch({ type: 'SET_ERROR', value: 'Invalid mobile number. It should be 10 digits.' });
      dispatch({ type: 'SET_LOADING', value: false });
      return;
    }

    // Check if email already exists
    const emailExists = await checkIfEmailExists(state.email);
    if (emailExists) {
      dispatch({ type: 'SET_ERROR', value: 'Email already exists.' });
      dispatch({ type: 'SET_LOADING', value: false });
      return;
    }

    // Register user if all validations pass
    try {
      const response = await register({
        username: state.username,
        email: state.email,
        password: state.password,
        mobileNumber: state.mobileNumber,
        gender: state.gender,
        profileImage: state.profileImage,
        role: state.role,
      });
      
      alert('Registration successful!');
      dispatch({ type: 'RESET' }); // Reset form state after successful registration
      navigate('/login'); // Redirect to login page
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: error.message || 'Registration failed.' });
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-teal-950 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {state.error && (
            <div className="text-red-600 text-sm mb-4">{state.error}</div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
            {state.profileImage && (
              <img
                src={state.profileImage}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={state.username}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'username', value: e.target.value })}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={state.mobileNumber}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'mobileNumber', value: e.target.value })}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={state.email}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                value={state.gender}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'gender', value: e.target.value })}
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
                value={state.role}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'role', value: e.target.value })}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="admin">Admin</option>
                <option value="student">student</option>
                <option value="instructor">instructor</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={state.password}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={state.confirmPassword}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: e.target.value })}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded-md focus:outline-none hover:bg-teal-700 disabled:bg-teal-400"
            disabled={state.loading}
          >
            {state.loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
