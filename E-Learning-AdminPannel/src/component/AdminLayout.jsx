



import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  MdDashboardCustomize,
  MdAssignment,
  MdPeople,
  MdQuiz,
  MdReport,
  MdSettings,
  MdHelp,
  MdMenu,
  MdNotifications,
  MdAccountCircle,
  MdLogout,
} from 'react-icons/md';

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pages = [
    { title: 'Dashboard', icon: <MdDashboardCustomize />, route: '/admin/dashboard' },
    { title: 'Courses', icon: <MdAssignment />, route: '/admin/courses/create' },
    { title: 'Users', icon: <MdPeople />, route: '/admin/users' },
    { title: 'Assignments', icon: <MdAssignment />, route: '/admin/assignments' },
    { title: 'Quizzes', icon: <MdQuiz />, route: '/admin/quizzes' },
    { title: 'Reports', icon: <MdReport />, route: '/admin/reports' },
    { title: 'Settings', icon: <MdSettings />, route: '/admin/settings' },
    { title: 'Help & Support', icon: <MdHelp />, route: '/admin/help_support' },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <header className="flex z-10 justify-between items-center p-4 bg-gray-900 text-white shadow-md">
        <div className="flex items-center">
          <button
            className="md:hidden p-2 hover:bg-gray-700 rounded transition duration-200"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <MdMenu size={24} />
          </button>
          <h1 className="text-xl ml-2">Admin Dashboard</h1>
        </div>
        {/* Top Nav Icons */}
        <div className="flex md:items-center space-x-4">
          <div className=" hidden md:flex relative ">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="hidden md:flex relative hover:bg-gray-700 p-2 rounded transition duration-200">
            <MdNotifications size={24} />
          </button>
          <Link to="/admin/profile" className="relative hover:bg-gray-700 p-2 rounded transition duration-200">
            <MdAccountCircle size={24} />
          </Link>
          <Link to="/admin/settings" className="hidden md:flex relative hover:bg-gray-700 p-2 rounded transition duration-200">
            <MdSettings size={24} />
          </Link>
          <Link to="/logout" className="hidden md:flex relative hover:bg-gray-700 p-2 rounded transition duration-200">
            <MdLogout size={24} />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <nav
          className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform transform bg-gray-900 text-white md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          
          
          <div className="p-4">
          <h1 className="text-xl ml-2 py-4 md:hidden">Admin Dashboard</h1>
        
                <div className="md:hidden flex items-center py-2  rounded transition duration-200">
                <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
                </div>
             
            {pages.map((item, index) => (
              <Link to={item.route} key={index}>
                <div className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
                  <div className="mr-2">{item.icon}</div>
                  <span>{item.title}</span>
                </div>
              </Link>
            ))}
            <Link to='/logout' >
                <div className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
                  <div className="mr-2"><MdLogout  /></div>
                  <span>logout
                  </span>
                </div>
              </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main
          className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* More content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
