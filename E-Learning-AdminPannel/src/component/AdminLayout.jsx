import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
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
  MdDarkMode
} from "react-icons/md";
import DarkModeSwitch from "./Darkmode";

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pages = [
    {
      title: "Dashboard",
      icon: <MdDashboardCustomize />,
      route: "/admin/dashboard",
    },
    {
      title: "Courses",
      icon: <MdAssignment />,
      route: "/admin/courses/create",
    },
    { title: "Users", icon: <MdPeople />, route: "/admin/users" },
    {
      title: "Assignments",
      icon: <MdAssignment />,
      route: "/admin/assignments",
    },
    { title: "Quizzes", icon: <MdQuiz />, route: "/admin/quizzes" },
    { title: "Reports", icon: <MdReport />, route: "/admin/reports" },
    { title: "Settings", icon: <MdSettings />, route: "/admin/settings" },
    { title: "Help & Support", icon: <MdHelp />, route: "/admin/help_support" },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Top Navigation */}
      <header className="w-full flex z-10 justify-between items-center p-4 bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0">
        <div className="flex items-center">
          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded-full transition duration-200"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <MdMenu size={24} />
          </button>
          <h1 className="text-xl ml-2 font-semibold">Admin Dashboard</h1>
        </div>
        {/* Top Nav Icons */}
        <div className="flex md:items-center space-x-4">
          <div className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        <DarkModeSwitch/>
          <button className="hidden md:flex relative hover:bg-gray-800 p-2 rounded-full transition duration-200">
            <MdNotifications size={24} />
          </button>
          <NavLink
            to="/admin/profile"
            className="relative hover:bg-gray-800 p-2 rounded-full transition duration-200"
          >
            <MdAccountCircle size={24} />
          </NavLink>
          <NavLink
            to="/admin/settings"
            className="hidden md:flex relative hover:bg-gray-800 p-2 rounded-full transition duration-200"
          >
            <MdSettings size={24} />
          </NavLink>
          <NavLink
            to="/logout-user"
            className="hidden md:flex relative hover:bg-gray-800 p-2 rounded-full transition duration-200"
          >
            <MdLogout size={24} />
          </NavLink>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <nav
          className={`fixed inset-y-0 left-0 z-50 w-48 transition-transform transform bg-gray-900 text-white md:relative md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="p-4">
            <h1 className="text-xl ml-2 py-4 md:hidden font-semibold">Admin Dashboard</h1>

            <div className="md:hidden flex items-center py-2 rounded transition duration-200">
              <div className="relative w-full max-w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {pages.map((item, index) => (
              <NavLink
                to={item.route}
                key={index}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 bg-indigo-600 text-white rounded-lg shadow transition duration-200"
                    : "flex items-center p-2 hover:bg-gray-700 rounded-lg transition duration-200"
                }
              >
                <div className="mr-2">{item.icon}</div>
                <span className="font-medium">{item.title}</span>
              </NavLink>
            ))}

            <NavLink to="/logout" onClick={handleLinkClick}>
              <div className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition duration-200">
                <div className="mr-2">
                  <MdLogout />
                </div>
                <span className="font-medium">Logout</span>
              </div>
            </NavLink>
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hide ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
