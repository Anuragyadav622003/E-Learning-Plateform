import React, { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <>
    {/* <button
      className="flex flex-row justify-between items-center border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 w-28 transition-colors duration-300"
      onClick={() => setIsDarkMode(!isDarkMode)}
    > */}
      <button
      className="flex flex-row justify-between items-center   dark:border-gray-600 "
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {/* Display different icons for dark and light modes */}
      {isDarkMode ? (
        <>
          <MdLightMode size={24} className="text-yellow-500" />
        
        </>
      ) : (
        <>
          <MdDarkMode size={24} />
         
        </>
      )}
    </button>
    </>
  );
};

export default DarkModeSwitch;
