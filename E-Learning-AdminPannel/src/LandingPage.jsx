import React from 'react';

function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">E-Learning Admin Panel</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#features" className="hover:text-indigo-300">Features</a>
            </li>
            <li>
              <a href="#cta" className="hover:text-indigo-300">Get Started</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-300">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-500 to-indigo-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Manage Your E-Learning Platform Effortlessly</h2>
        <p className="text-lg mb-6">An intuitive dashboard to oversee courses, users, and performance analytics.</p>
        <img 
          src="https://via.placeholder.com/600x300" 
          alt="E-learning dashboard example" 
          className="rounded-lg shadow-lg mb-6"
        />
        <a href="#cta" className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100">Get Started</a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Key Features</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <img 
              src="https://via.placeholder.com/150" 
              alt="User Management" 
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-xl font-bold mb-2">User Management</h3>
            <p>Manage users effectively with roles and permissions, ensuring a smooth learning experience.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Course Creation" 
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-xl font-bold mb-2">Course Creation</h3>
            <p>Quickly create and manage courses with various content types, quizzes, and resources.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Analytics Dashboard" 
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
            <p>Gain insights into user progress, course performance, and engagement through detailed analytics.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Notifications" 
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-xl font-bold mb-2">Notifications</h3>
            <p>Send timely notifications to users about new courses, updates, and important announcements.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Support & Help" 
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-xl font-bold mb-2">Support & Help</h3>
            <p>Access support resources and help documentation to assist both admins and users.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Integration" 
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-xl font-bold mb-2">Integration</h3>
            <p>Easily integrate with various tools and platforms to enhance your e-learning experience.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="bg-indigo-700 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Take Control?</h2>
        <p className="mb-6">Join us today and start managing your e-learning platform seamlessly.</p>
        <a href="/login" className="bg-white text-indigo-700 px-6 py-3 rounded-lg hover:bg-indigo-100">Login</a>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-4">
        <div className="text-center">
          <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
          <p>Contact: support@example.com</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
