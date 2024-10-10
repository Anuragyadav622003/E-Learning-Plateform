import Base_url from "../../Base_url";
import axios from 'axios';
export const dashboardData = async()=>{
   
    try {
      const response =   await axios.get(`${Base_url}/dashboard`);
      return response.data;
    } catch (error) {
        console.log("error in dashboardData",error);
        throw new Error("Error in dashboardData: " + error.message);
    }
 
};
export const dashboard_User_Stats = async()=>{
    try {
      const response =   await axios.get(`${Base_url}/user-stats`);
      return response.data;
    } catch (error) {
        console.log("error in dashboard user-stats",error);
        throw new Error("Error in dashboard user-stats: " + error.message);
    }
 
};