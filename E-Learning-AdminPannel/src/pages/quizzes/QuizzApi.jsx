import Base_url from "../../Base_url";
import axios from 'axios';

export const createQuizz = async (postData) => {
  try {
    console.log(postData,"postData");
    const response = await axios.post(`${Base_url}/api/quizz/createQuizz`, postData);
    return response.data;
  } catch (error) {
    console.error("Error in createQuizz:", error);
    throw new Error("Failed to create quiz: " + (error.response?.data?.message || error.message));
  }
};
