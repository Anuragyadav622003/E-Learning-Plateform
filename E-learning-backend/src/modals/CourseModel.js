// import mongoose from "mongoose";
// // Lesson Schema
// const lessonSchema = new mongoose.Schema({
//   sid: { type: Number, required: true },
//   stitle: { type: String, required: true },
//   videoUrl: { type: String, required: true },
//   content: { type: String, required: true },
// });

// // Module Schema
// const moduleSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   title: { type: String, required: true },
//   lessons: [lessonSchema], // Array of lessons
// });

// // Course Schema
// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   instructor: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Assuming 'Instructor' is another model
//   category: { type: String, required: true },
//   price: { type: Number, required: true },
//   thumbnail: { type: String, required: true },
//   duration: { type: String, required: true },
//   level: { type: String, required: true },
//   language: { type: String, required: true },
//   modules: [moduleSchema], // Array of modules
// });
// const Course = mongoose.model("Courses", courseSchema);
// export default Course;



import mongoose from "mongoose";

// Lesson Schema
const lessonSchema = new mongoose.Schema(
  {
    sid: { type: Number, required: true },
    stitle: { type: String, required: true },
    videoUrl: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // Track lesson creation & updates
);

// Module Schema
const moduleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    lessons: [lessonSchema],
  },
  { timestamps: true } // Track module creation & updates
);

// Rating Schema
const ratingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, unique: true },
    stars: { type: Number, required: true, min: 1, max: 5 }, // 1 to 5 stars
  },
  { timestamps: true } // Track when a rating was given
);

// Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    language: { type: String, required: true },
    modules: [moduleSchema],
    ratings: { type: [ratingSchema], default: [] },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Track users who liked the course
  },
  { timestamps: true } // Track course creation & updates
);

// Virtual field: Total Likes
courseSchema.virtual("totalLikes").get(function () {
  return this.likedBy.length;
});

// Virtual field: Average Rating
courseSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  const totalStars = this.ratings.reduce((sum, r) => sum + r.stars, 0);
  return (totalStars / this.ratings.length).toFixed(1);
});

// Ensure virtuals appear in JSON responses
courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });

const Course = mongoose.model("Courses", courseSchema);
export default Course;
