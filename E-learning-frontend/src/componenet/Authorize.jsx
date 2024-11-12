import axios from 'axios';
import Base_URL from '../Base_Url';

export const authorize = async () => {
   
  const token = localStorage.getItem("accessToken");
alert(token);
  // Check if token exists in localStorage
  if (!token) {
    console.warn("No access token found. User is not authorized.");
    return false;
  }

  try {

    // Attempt authorization API call
    const response = await axios.get(`${Base_URL}/api/authorize/check`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Authorization successful
    return response.data;
  } catch (error) {
    console.error("Authorization Error:", error.message);

    // Handle specific 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized: Token expired or invalid. Redirecting to login.");
      localStorage.removeItem("accessToken"); // Clear token from storage
      return false; // Return false to prompt re-login
    }

    // Handle other errors
    throw new Error(error.message || "Authorization Error");
  }
};
