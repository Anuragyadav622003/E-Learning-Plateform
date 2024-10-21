import React, { memo, useState } from 'react';
import BasicSelect from '../../componenet/SelectOption';
import SearchBar from '../../componenet/SearchBar';

function QuizzNav({searchQuery,setSearchQuery}) {
  
  const categories = ["All Categories", "Programming", "Science", "Math"];
  const sortOptions = ["Default", "Sort by Title", "Sort by Difficulty"];

  return (
    <nav className="w-screen m-4">
      <div className="flex justify-center">
        {/* Filter Options */}
        <div className="flex mb-4 items-center space-x-4  ">
          {/* Search Bar */}
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />

          {/* Category Selection */}
          {/* <BasicSelect options={categories} title="Select a Category" /> */}

          {/* Sort Options */}
          
          {/* <BasicSelect options={sortOptions} title="Sort By" className="sm:hidden" /> */}
        </div>
      </div>
    </nav>
  );
}

export default memo(QuizzNav);
