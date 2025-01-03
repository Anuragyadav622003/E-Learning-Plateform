import Course from "../modals/CourseModel.js";
import User from "../modals/UserModel.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create multiple courses
export const createCourse = async (req, res) => {
    try {
        const data = req.body;
        const userId =req.user._id;
    
        // Check if the request body is an array (bulk insert) or a single object
        if (Array.isArray(data)) {
          if (data.length === 0) {
            return res.status(400).json({ error: "Empty array received. Provide course data." });
          }
    
          // Bulk creation
          const courses = await Course.insertMany(data,{ writeConcern: { w: 1, wtimeout: 5000 } });
          
        const user =  await User.findByIdAndUpdate(userId,{
            $push: { coursesCreated: courses._id }
          });
          console.log(user)
          return res.status(201).json({
           message: `${courses.length} courses created successfully!`,
            courses,
          });
        } else if (typeof data === "object" && Object.keys(data).length > 0) {
          // Single course creation
          const course = new Course(data);
          await course.save();
          return res.status(201).json({
            message: "Course created successfully!",
            course,
          });
        } else {
          return res.status(400).json({ error: "Invalid data format. Provide valid course data." });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
};
