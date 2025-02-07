import Course from "../modals/CourseModel.js";
import User from "../modals/UserModel.js";
import mongoose from "mongoose";
// Get all courses
export const getAllCourses = async (req, res) => {
  try { 
    const courses = await Course.find().populate('instructor','username email');
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
    const userId = req.user._id;

    // Check if the request body is an array (bulk insert) or a single object
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return res.status(400).json({ error: "Empty array received. Provide course data." });
      }

      // Bulk creation
      const courses = await Course.insertMany(data, { writeConcern: { w: 1, wtimeout: 5000 } });

      // Update the user with the newly created courses' IDs
      const courseIds = courses.map(course => course._id); // Extract course IDs
      const user = await User.findByIdAndUpdate(userId, {
        $push: { coursesCreated: { $each: courseIds } }, // Use $each to push multiple values
      });

      console.log(user);
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


// ✅ Rate or Like/Unlike Course
export const updateCourseInteraction = async (req, res) => {
  try {
    console.log(req.user);
    const { courseId } = req.params;
    const { userId, stars, like } = req.body; // 'like' is boolean (true for like, false for unlike)

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Handle Rating
    if (stars !== undefined) {
      if (stars < 1 || stars > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }

      const existingRating = course.ratings.find((r) => r.userId.toString() === userId);

      if (existingRating) {
        existingRating.stars = stars; // Update existing rating
      } else {
        course.ratings.push({ userId, stars }); // Add new rating
      }
    }

    // ✅ Handle Like/Unlike
    if (like !== undefined) {
      const likedIndex = course.likedBy.findIndex((id) => id.toString() === userId);

      if (like && likedIndex === -1) {
        course.likedBy.push(userId); // Like the course
      } else if (!like && likedIndex !== -1) {
        course.likedBy.splice(likedIndex, 1); // Unlike the course
      }
    }

    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
