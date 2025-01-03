import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    categories: [String], // Course categories
    pricing: {
      cost: Number,
      currency: String,
      isFree: { type: Boolean, default: false },
    },
    reviews: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now }, // Explicitly maintained here
      },
    ],
    modules: [
      {
        title: { type: String, required: true },
        subtitles: [
          {
            title: { type: String, required: true },
            videoUrl: { type: String, required: true },
            content: { type: String, required: true },
            quizzes: [
              {
                question: String,
                options: [String],
                correctAnswer: String,
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Course = mongoose.model("Courses", courseSchema);
export default Course;
