import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [student, setStudent] = useState(null);

  // Sample data representing courses with progress; replace this with actual data.
  const courses = [
    { id: 1, title: 'React for Beginners', progress: 75 },
    { id: 2, title: 'Advanced JavaScript', progress: 50 },
    { id: 3, title: 'Data Structures and Algorithms', progress: 40 },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setStudent(JSON.parse(userData)); // Retrieve user data from localStorage
    }
  }, []);

  if (!student) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-teal-400 to-teal-600 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-teal-400 to-teal-600 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-teal-900 text-center mb-8">My Profile</h1>
        
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={student.picture} // User's profile image
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-teal-900 shadow-lg transition-transform transform hover:scale-105"
          />
        </div>
        
        {/* Student Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">Personal Information</h2>
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <p className="text-lg mb-2"><strong>Name:</strong> <span className="text-teal-600">{student.name}</span></p>
            <p className="text-lg mb-2"><strong>Email:</strong> <span className="text-teal-600">{student.email}</span></p>
            <p className="text-lg"><strong>Nickname:</strong> <span className="text-teal-600">{student.nickname}</span></p>
          </div>
        </div>
    
        {/* Courses with Progress */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">Courses Enrolled</h2>
          <ul className="list-disc pl-5">
            {courses.map(course => (
              <li key={course.id} className="flex justify-between items-center mb-4">
                <span className="text-lg">{course.title}</span>
                <div className="relative w-32">
                  <div className="bg-gray-300 h-2 rounded">
                    <div
                      className={`h-2 rounded ${course.progress >= 70 ? 'bg-green-600' : course.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-medium text-teal-900">
                    {course.progress}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button className="bg-teal-900 text-white font-semibold rounded-md px-8 py-3 hover:bg-teal-700 transition duration-200 shadow-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
