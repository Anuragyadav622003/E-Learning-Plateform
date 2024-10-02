// src/useDarkMode.js

import { useEffect } from 'react';

const useDarkMode = () => {
  useEffect(() => {
    // Function to apply dark mode based on user's preference
    const applyDarkMode = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    // Apply dark mode on initial load
    applyDarkMode();

    // Listen for changes to the user's color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      if (event.matches) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup the listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
};

export default useDarkMode;
