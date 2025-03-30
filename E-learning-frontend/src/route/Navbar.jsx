import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DarkModeSwitch from '../componenet/Darkmod';
import logo from '../assets/companylogo.png';
import { useAuth } from '../context/context';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Quizzes', href: '/quizzes' },
  { name: 'Interview', href: '/interview' },
  { name: 'Profile', href: '/profile' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate();

  const profile = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: isLoggedIn ? 'Sign out' : 'Login', href: isLoggedIn ? '#' : '/login' },
  ];

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      setDropdownOpen(false); // Close dropdown after logout
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('#profile-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav className="bg-gray-800 w-screen">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-white font-extrabold px-2">Skillify</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center space-x-4 ml-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-gray-900 text-white' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Dark Mode Toggle */}
            <DarkModeSwitch />

            {/* Profile Dropdown */}
            <div className="relative" id="profile-dropdown">
              <button
                onClick={toggleDropdown}
                className="flex items-center rounded-full p-1 bg-gray-800 text-sm focus:outline-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User Avatar"
                  className="hidden md:block h-7 w-7 rounded-full"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <div className="py-1">
                    {profile.map((item) => (
                      item.name === 'Sign out' ? (
                        <button
                          key={item.name}
                          onClick={handleLogoutClick}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex">
            <DarkModeSwitch />
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              {isOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pb-3 pt-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {isLoggedIn && (
              <button
                onClick={handleLogoutClick}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
