import axios from "axios";
const Base_Url = `http://localhost:5000/api`; // Make sure to update the URL for production

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

// Register API call
// const register = async (postData) => {
//   try {
//     // Sending POST request for user registration
//     const response = await axios.post(`${Base_Url}/user/register`, postData);
//     console.log(response.data, "register");

//     // Returning the response or a success message
//     return response.data;
//   } catch (error) {
//     console.error("Error in register API:", error);
//     if (error.response) {
//       // Handle error response from server (e.g., user already exists)
//       return error.response.data?.message || "An error occurred during registration.";
//     }
//     return "An error occurred during registration.";
//   }
// };

// export { login };
