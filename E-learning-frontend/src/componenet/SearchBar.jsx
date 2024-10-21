import React from 'react';

export const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search quizzes..."
      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};




export const SortOptions = ({ onSortChange }) => {
  return (
    <select
      className="border border-gray-300 rounded-lg px-4 py-2"
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="default">Default</option>
      <option value="title">Sort by Title</option>
      <option value="difficulty">Sort by Difficulty</option>
    </select>
  );
};


