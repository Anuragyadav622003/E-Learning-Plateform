import React,{useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import  { getAllCourses } from "./CourseApi";

 const CourseDetails = () => {
  const { id } = useParams();
   const[courses,setCourses] = useState([]);
   
  const navigate = useNavigate();
 
//fetch data
useEffect(()=>{
 const fetchCourses = async () => {
      try {
        const resp = await getAllCourses(); 
        setCourses(resp);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
       navigate('/courses');
      } 
    };

    fetchCourses();

},[]);

const filteredCourses = courses.filter((course, index) => index == id);
const course = filteredCourses.length > 0 ? filteredCourses[0] : null;
console.log(course);
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center">
        <p className="text-center text-2xl font-bold text-gray-500 mt-6">
          Course Not Found
        </p>
        <button
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors duration-300"
          onClick={() => navigate("/courses")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Section */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full  object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {course.title}
            </h2>
           { course.instructor?.username && <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
              By: {course.instructor?.username}
            </p>
            }
              <div className="flex items-center mt-2 mb-4">
                <p>Rating: </p>
             {/* course rating  need to upade  */}
                               {[...Array(5)].map((_, i) =>
                                 i < course.ratings[0]?.stars ? (
                                   <FaStar key={i} className="text-sm text-yellow-500" />
                                 ) : i === Math.floor(course.rating) ? (
                                   <FaStarHalfAlt key={i} className="text-yellow-500" />
                                 ) : (
                                   <FaStar
                                     key={i}
                                     className="text-sm text-gray-300 dark:text-gray-500"
                                   />
                                 )
                               )}
                               </div>
            <button
              onClick={() => navigate("/courses")}
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors duration-300"
            >
              Back to Courses
            </button>
          </div>

          {/* Course Content Section */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-400 mb-6 leading-relaxed">
              {course.description}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What You'll Learn
            </h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-400 mb-6 space-y-3">
              <li>Comprehensive understanding of {course.title}</li>
              <li>Hands-on exercises to solidify learning</li>
              <li>Real-world applications of skills</li>
              <li>Access to additional resources and materials</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Instructor Bio
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
              {course.instructor?.username} is an experienced professional with over 10
              years in the industry. They have taught thousands of students and
              are passionate about sharing knowledge to help others grow.
            </p>

            <button
              className="mt-8 w-full bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition-colors duration-300"
              onClick={() => navigate(`/course/${id}/content`)}
            >
              Start Learning Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
