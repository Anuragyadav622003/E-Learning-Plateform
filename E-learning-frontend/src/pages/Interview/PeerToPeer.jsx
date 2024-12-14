import React, { useState } from 'react';
import axios from 'axios';


function PeerToPeer() {
  const [input, setInput] = useState('');
  const [testCase, setTestCase] = useState('');
  const [language, setLanguage] = useState('python3');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    if (!code.trim()) {
      setOutput('Code is required.');
      return;
    }
    try {
      const response = await axios.post('https://e-learning-plateform-468p.vercel.app/execute', {
      language: language,
        code: code,
        input: input
      });
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      setOutput('Error executing code.');
    }
  };

  // const renderOutput = (text) => {
  //   const tabWidth = 4; // Number of spaces per tab

  //   const elements = [];
  //   for (let i = 0; i < text.length; i++) {
  //     const char = text[i];
  //     if (char === "\n") {
  //       elements.push(<br key={`br-${i}`} />);
  //     } else if (char === "\t") {
  //       // Render tab as a series of non-breaking spaces
  //       elements.push(
  //         <span key={`tab-${i}`}>
  //           {Array(tabWidth)
  //             .fill("\u00A0")
  //             .join("")}
  //         </span>
  //       );
  //     } else if (char === " ") {
  //       elements.push(<span key={`space-${i}`}>&nbsp;</span>); // Render space
  //     } else {
  //       elements.push(char);
  //     }
  //   }
  //   return elements;
  // };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white mix-h-screen">
      {/* Description Section */}
      <div className="col-span-1 lg:col-span-4">
        <div className="mb-4">
          <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Select Language
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Choose the programming language in which your code will be executed.
          </p>
        </div>
        <div className="hidden lg:block min-h-screen">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between w-1/2">
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 ">
                Input
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                TestCase
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Test Result
              </label>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full mt-2 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
              placeholder="Enter input  here..."
            />
             <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 ">
                Output
              </label>
              
              <textarea
              value={output || ''}
              className="w-full mt-2 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
              placeholder="Waiting for output..."
            />
          </div>
        </div>
      </div>

      {/* Code Section */}
      <div className="col-span-1 lg:col-span-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <label className="text-base font-semibold text-gray-700 dark:text-gray-300">
             Code
          </label>

          {/* Language Selector */}
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
          >
            <option value="python3">Python 3</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="nodejs">JavaScript (Node.js)</option>
          </select>

          {/* Code Input Area */}
          <textarea
            className="w-full mt-4 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ maxHeight: '500px', overflowY: 'auto' }}
            rows="12"
            placeholder="Enter your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              onClick={handleSubmit}
            >
              Run Code
            </button>
          </div>
        </div>
      </div>

      {/* Test Case for Mobile */}
      <div className="col-span-1 lg:col-span-8 lg:hidden">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between w-72">
          <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 ">
                Input
              </label>
            <label className="text-base font-semibold text-gray-700 dark:text-gray-300">
              TestCase
            </label>
            <label className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Test Result
            </label>
          </div>
          <textarea
             value={input}
             onChange={(e) => setInput(e.target.value)}
            className="w-full mt-2 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="5"
            placeholder="Enter input here..."
          />
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 ">
                Output
              </label>
              
              <textarea
              value={output || ''}
              className="w-full mt-2 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
              placeholder="Waiting for output..."
            />
        </div>
      </div>
    </div>
  );
}

export default PeerToPeer;
