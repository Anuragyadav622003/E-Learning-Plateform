import React from 'react'

function QuizzNav() {
  return (
   <nav className=' w-screen  m-4 '>
 <div className="flex justify-center">
  
        
  
         {/* Filter Options */}
      <div className="flex mb-4 ">
      <input
          type="text"
          placeholder="Search quizzes..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
         
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 mr-4"
         
        >
          <option value="All">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Science">Science</option>
          <option value="Math">Math</option>
        </select>

        {/* Sort Options */}
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
        
         
        >
          <option value="default">Default</option>
          <option value="title">Sort by Title</option>
          <option value="difficulty">Sort by Difficulty</option>
          
        </select>
      </div>
        
      </div>
   </nav>
  )
}

export default QuizzNav