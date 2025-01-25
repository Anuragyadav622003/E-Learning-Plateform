import React, { useEffect, useState } from "react";
import userProfile from "./ProfileApi";

// Sample data for demonstration
const user = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  bio: "Aspiring web developer with a passion for learning new skills.",
  profilePicture: "https://via.placeholder.com/150",
  achievements: ["JavaScript Basics", "React Beginner"],
};

const enrolledCourses = [
  { id: 1, title: "Introduction to Web Development", progress: 80 },
  { id: 2, title: "Advanced JavaScript", progress: 50 },
  { id: 3, title: "React for Beginners", progress: 30 },
];

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio);

  const handleEditToggle = () => setEditing(!editing);
  const handleSaveBio = () => {
    user.bio = bio;
    setEditing(false);
  };



  useEffect(()=>{
const fetchUserProfile = async () => {
  try {
    // Fetch the user profile
    const profileData = await userProfile();
    console.log(profileData);
    toast.success("User profile fetched successfully!", {
      position: "top-right",
    });

    console.log(profileData);  // Use the profile data here
  } catch (error) {
    // If an error occurs, show an error toast
    toast.error("Unable to fetch user profile. Please try again.", {
      position: "top-right",
    });

    console.error("Unable to fetch user profile:", error);
    // Handle the error, e.g., display a message to the user
  }
};
fetchUserProfile();

  },[]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center py-10 bg-blue-600 dark:bg-blue-700 text-white">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-lg">{user.email}</p>
        <button
          className="mt-4 bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-300"
          onClick={handleEditToggle}
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Bio Section */}
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">About Me</h2>
        {editing ? (
          <div className="mt-2 w-full max-w-lg">
            <textarea
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <button
              className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveBio}
            >
              Save
            </button>
          </div>
        ) : (
          <p className="mt-2 text-gray-700 dark:text-gray-400">{user.bio}</p>
        )}
      </div>

      {/* Enrolled Courses */}
      <div className="flex-grow p-6 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Enrolled Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Progress: {course.progress}%</p>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="p-6 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Achievements</h2>
        <div className="flex justify-center space-x-4 mt-4">
          {user.achievements.map((achievement, index) => (
            <span
              key={index}
              className="bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-200 font-semibold px-4 py-2 rounded-full text-sm"
            >
              {achievement}
            </span>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Account Settings</h2>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Change Password
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
