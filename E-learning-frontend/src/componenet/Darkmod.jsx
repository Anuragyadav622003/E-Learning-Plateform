import React, { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // If no theme is stored, use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Update theme when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 text-white"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <MdLightMode size={20} />
      ) : (
        <MdDarkMode size={20} />
      )}
    </button>
  );
};

export default DarkModeSwitch;
