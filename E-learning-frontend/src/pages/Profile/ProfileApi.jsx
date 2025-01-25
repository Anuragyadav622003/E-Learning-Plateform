import axios from "axios";
import Base_Url from "../../Base_Url";
import { handleWarning } from "../../../utils";

const userProfile = async () => {
  try {
   
    // Get the token from localStorage
    const token = localStorage.getItem('accessToken');
   

    // Check if the token exists
    if (!token) {
      handleWarning("User not found. Please log in.");
      throw new Error("Token not found. Please log in.");
    }

    // Make the API request
    const response = await axios.get(`${Base_Url}/api/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Return the user data if successful
    return response;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching user profile:", error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};

export default userProfile;
