import axios from "axios";
import Base_Url from "../../Base_Url";

// Login API call
const login = async (postData) => {
  try {
    console.log("Login Request:", postData);

    // Sending POST request to login endpoint
    const response = await axios.post(`${Base_Url}/api/user/login`, postData);

    console.log("Login Response:", response);

    // Ensure token is present in the response
    if (response?.data?.accessToken && response?.data?.refreshToken) {
     

      // Store tokens securely
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user",JSON.stringify(response.data.user))
      
      return { ok: true, msg: response.data.msg, user: response.data.user };
    } else {
      throw new Error("Failed to retrieve tokens");
    }
  } catch (error) {
    console.error("Error in login API:", error);
    const errorMsg =
      error.response?.data?.msg || "An error occurred during login.";
    return { ok: false, msg: errorMsg };
  }
};

// Function to register a new user
const register = async (userData) => {
  try {
    console.log("Register Request:", userData);

    // Sending the registration data
    const response = await axios.post(`${Base_Url}/api/user/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Register Response:", response);

    return { ok: true, msg: response.data.msg };
  } catch (error) {
    const errorMsg =
      error.response?.data?.msg || "An unexpected error occurred";

    console.error("Register Error:", errorMsg);
    return { ok: false, msg: errorMsg };
  }
};

const handleGoogleLogin = async (googleIdToken) => {
  try {
    const response = await axios.post(
      `${Base_Url}/api/user/google`,
      { token: googleIdToken }, // Send token as an object
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Google Login Response:", response);

    if (response?.data?.accessToken && response?.data?.refreshToken) {
      console.log("Google Login Successful:", response.data);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return { ok: true, msg: "Google login successful", user: response.data.user };
    } else {
      throw new Error("Failed to retrieve tokens");
    }
  } catch (error) {
    console.error("Error in Google Login:", error);
    const errorMsg =
      error.response?.data?.msg || "An error occurred during Google login.";
    return { ok: false, msg: errorMsg };
  }
};




export { login, register,handleGoogleLogin };
