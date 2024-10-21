import React, { memo } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ( {searchQuery,setSearchQuery}) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative rounded-lg bg-white shadow-md max-w-lg"> {/* Set max width here */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center">
        <SearchIcon className="text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 min-w-52 sm:min-w-80 md:min-w-96 w-full" // Added w-full to ensure the input takes the full width
      />
    </div>
  );
};

export default memo(SearchBar);
