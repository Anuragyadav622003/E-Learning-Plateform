import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from './AuthApi';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be between 3 and 20 characters')
    .max(20, 'Username must be between 3 and 20 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must have at least one uppercase letter')
    .matches(/[a-z]/, 'Password must have at least one lowercase letter')
    .matches(/\d/, 'Password must have at least one number')
    .matches(/[@$!%*?&]/, 'Password must have at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      profileImage: null,
      username: '',
      email: '',
      mobileNumber: '',
      gender: '',
      role: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const emailExists = await checkIfEmailExists(values.email);
        if (emailExists) {
          formik.setErrors({ email: 'Email already exists.' });
          return;
        }

        await register({
          username: values.username,
          email: values.email,
          password: values.password,
          mobileNumber: values.mobileNumber,
          gender: values.gender,
          profileImage: values.profileImage,
          role: values.role,
        });

        alert('Registration successful!');
        formik.resetForm();
        navigate('/login');
      } catch (error) {
        formik.setErrors({ general: error.message || 'Registration failed.' });
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('profileImage', URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-teal-950 mb-6">Create an Account</h2>
        <form onSubmit={formik.handleSubmit}>
          {formik.errors.general && (
            <div className="text-red-600 text-sm mb-4">{formik.errors.general}</div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            {formik.values.profileImage && (
              <img
                src={formik.values.profileImage}
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
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-600 text-sm">{formik.errors.username}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Enter your phone number"
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                <div className="text-red-600 text-sm">{formik.errors.mobileNumber}</div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-red-600 text-sm">{formik.errors.gender}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Confirm your password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-600 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
