import axios from "axios";
import Base_Url from "../../Base_Url";


// Login API call
const login = async (postData) => {
  try {
    console.log(postData);
    // Sending POST request with user data (postData) to login endpoint
    const response = await axios.post(`${Base_Url}/user/login`, postData);

    // Ensure token is present in the response
    if (response?.data?.accessToken && response?.data?.refreshToken) {
      console.log(response.data);

      // For development, store tokens in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return response.data.message; // Return message or any other response data you want
    } else {
      throw new Error("Failed to retrieve tokens");
    }
  } catch (error) {
    console.error("Error in login API:", error);
    if (error.response) {
      // Handle error response from server (e.g., invalid credentials)
      return error.response.data?.message || "An error occurred during login.";
    }
    return "An error occurred during login.";
  }
};






// Function to register a new user
const register = async (userData) => {
  try {
    console.log("User Data:", userData);

    // Sending the registration data
    const response = await axios.post(`${Base_Url}/api/user/register`, userData, {
      headers: { 'Content-Type': 'application/json' },  // Set Content-Type to 'application/json'
    });

    console.log("Response:", response);

    // Check if registration was successful and return appropriate message
    return { ok: true, msg: response.data.msg };
  } catch (error) {
    // Handle errors and extract message
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : error.message || "An unexpected error occurred";

    console.error("Error Message:", message);
    return { ok: false, msg: message };
  }
};


export { login, register };
