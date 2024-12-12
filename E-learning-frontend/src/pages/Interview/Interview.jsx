import React from 'react';

const InterviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Interview: Solve DSA Problem
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Editor Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Problem: Find the Missing Number</h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Problem Statement:
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Given an array of n-1 integers, find the missing number between 1 and n.
              </p>

              {/* Code Editor (Using a TextArea for simplicity, can be replaced with a real code editor like Monaco or CodeMirror) */}
              <textarea
                placeholder="Write your solution here..."
                className="w-full h-80 p-4 mt-4 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mt-4 flex justify-between">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Run</button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg">Submit</button>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Live Chat</h2>
            <div className="flex flex-col space-y-4 h-full overflow-y-scroll">
              {/* Sample Chat Messages */}
              <div className="flex justify-end">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  Good luck with the problem!
                </div>
              </div>
              <div className="flex justify-start">
                <div className="p-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white">
                  Thank you! I will try my best.
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Send</button>
            </div>
          </div>
        </div>

        {/* Video Call Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Video Call</h2>
          <div className="relative pb-9/16">
            <video className="w-full h-full rounded-lg bg-black" muted autoPlay></video>
            <video className="w-full h-full rounded-lg absolute top-0 left-0 bg-black" autoPlay></video>
          </div>
          <div className="mt-4 flex justify-between">
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg">End Call</button>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter peer ID"
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white mr-4"
              />
              <span className="text-gray-900 dark:text-white">Peer ID</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
