// controllers/dashboardController.js
import { Quizz } from "../modals/Quizz.model.js";
import User from "../modals/User.model.js";

// Function to get dashboard data
const getDashboardData = async (req, res) => {
  try {
    // Using Promise.all to execute multiple queries concurrently for performance
    const [
      totalUsers,
      totalStudents,
      totalAdmins,
      totalInstructors,
      totalQuizzes,
      quizzesCreated,
      recentQuizzes,
    ] = await Promise.all([
      User.countDocuments(), // Total number of users
      User.countDocuments({ role: 'student' }), // Total number of students
      User.countDocuments({ role: 'admin' }), // Total number of admins
      User.countDocuments({ role: 'instructor' }), // Total number of instructors
      Quizz.countDocuments(), // Total number of quizzes
      Quizz.countDocuments({ createdBy: { $ne: null } }), // Quizzes created by users
      Quizz.find().sort({ createdAt: -1 }).limit(5).select("title description category banner_url"), // Recent quizzes
    ]);

    // Example of recent activities (this could be expanded with actual logging)
    const recentActivities = [
      { user: 'Poornima', action: 'Logged in', time: '1 hour ago' }, // Example activity
      { user: 'John', action: 'Started a quiz', time: '2 hours ago' },
    ];

    // Prepare the dashboard data to send to the frontend
    const dashboardData = {
      totalUsers,
      totalStudents,
      totalAdmins,
      totalInstructors,
      totalQuizzes,
      quizzesCreated,
      recentQuizzes,
      recentActivities,
    };

    // Send data as JSON response
    res.status(200).json(dashboardData);
  } catch (error) {
    // Log the error and send an error response
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'An error occurred while fetching dashboard data.' });
  }
};

// Function to get user-specific statistics
const getUserStatistics = async (req, res) => {
  try {
    const userId = req.user?.id; // Get the current user's ID from the request

    // If userId is not present, return a 403 error
    if (!userId) {
      return res.status(403).json({ error: 'User not authenticated.' });
    }

    // Count new users added today
    const newUsersToday = await User.countDocuments({
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0), // Users created from the start of the current day
      },
    });

    // Retrieve current user data (username and role)
    const currentUser = await User.findById(userId).select("username role");

    // If the current user is not found, return a 404 error
    if (!currentUser) {
      console.error('Current user not found'); // Log if user is not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Count quizzes created by the current user
    const quizzesCreated = await Quizz.countDocuments({ createdBy: userId });

    // Prepare user statistics, including the current user's information
    const userStats = {
      newUsersToday, // Number of new users added today
      currentUser: {
        username: currentUser.username || 'N/A', // Default to 'N/A' if username is not available
        role: currentUser.role || 'N/A',         // Default to 'N/A' if role is not available
        quizzesCreated,                           // Number of quizzes created by the current user
      },
    };

    // Send user statistics as JSON response
    res.status(200).json(userStats);
  } catch (error) {
    // Log the error and send an error response
    console.error('Error fetching user statistics:', error);
    res.status(500).json({ error: 'Failed to retrieve user statistics.' });
  }
};

// Export the functions for use in other modules
export { getDashboardData, getUserStatistics };
