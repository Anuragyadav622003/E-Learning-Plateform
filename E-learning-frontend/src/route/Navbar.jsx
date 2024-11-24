import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeSwitch from '../componenet/Darkmod';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Quizzes', href: '/quizzes' },
  { name: 'Profile', href: '/profile' },
];

const profile = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '/logout' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setIsOpen(!isOpen);

  const classNames = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <nav className="bg-gray-800 w-screen">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14"> {/* Adjusted height */}
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="text-white font-extrabold text-lg sm:text-xl px-2">SkillSphere</span> {/* Updated font size */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
            <div className="flex space-x-4 ml-auto">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm md:text-base font-medium', // Updated font size
                      isActive ? 'bg-gray-900 text-white' : ''
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Dark Mode Toggle */}
              <DarkModeSwitch />
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User Avatar"
                    className="hidden md:block h-8 w-8 rounded-full"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {profile.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              'block px-4 py-2 text-sm md:text-base', // Adjust font size
                              isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                            )
                          }
                          onClick={toggleDropdown}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex">
            <DarkModeSwitch />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9.293l-4.646 4.647a.5.5 0 01-.708-.707L9.293 9 5.646 5.353a.5.5 0 01.708-.707L10 8.293l4.646-4.647a.5.5 0 01.708.707L10.707 9l4.647 4.646a.5.5 0 01-.707.707L10 9.707l-4.646 4.647a.5.5 0 01-.708-.707L10 9.293z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {[...navigation, ...profile].map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    'block rounded-md px-3 py-2 text-base font-medium',
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
