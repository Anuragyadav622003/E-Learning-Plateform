import React, { useState } from "react";
import VideoGallery from "../../componenet/YoutubeVideo";

// Sample courses data
const coursesData = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the basics of HTML, CSS, and JavaScript.", instructor: "John Doe", rating: 4.5, image: "https://via.placeholder.com/150" },
  { id: 2, title: "Advanced JavaScript", description: "Master the advanced concepts of JavaScript.", instructor: "Jane Smith", rating: 4.7, image: "https://via.placeholder.com/150" },
  { id: 3, title: "React for Beginners", description: "A beginner-friendly introduction to React.", instructor: "Chris Lee", rating: 4.8, image: "https://via.placeholder.com/150" },
  { id: 4, title: "Node.js Essentials", description: "Learn how to build backends using Node.js.", instructor: "Alex Johnson", rating: 4.6, image: "https://via.placeholder.com/150" },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on the search query
  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Courses</h1>
        
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-black max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 flex flex-col h-full"
            >
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h2>
                  <p className="text-gray-700 dark:text-gray-400 mb-2">{course.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Instructor: {course.instructor}</p>
                </div>
                <div>
                  <p className="text-yellow-500 font-bold">Rating: {course.rating} ⭐</p>
                  <button className="mt-4 w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No courses found.</p>
        )}
        <VideoGallery/>
      </div>
    </div>
  );
};

export default Courses;
