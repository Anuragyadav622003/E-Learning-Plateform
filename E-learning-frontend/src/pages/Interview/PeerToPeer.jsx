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
        language,
        code,
        input,
      });
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      setOutput('Error executing code.');
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white max-h-screen'>
      {/* Description Section */}
      <div className='col-span-1 lg:col-span-4'>
        <div className='mb-4'>
          <label className='text-lg font-semibold text-gray-700 dark:text-gray-300'>Select Language</label>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
            Choose the programming language in which your code will be executed.
          </p>
        </div>

        {/* Test Case Section */}
        <div className='hidden lg:block min-h-screen'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between w-48'>
              <label className='text-lg font-semibold text-gray-700 dark:text-gray-300'>TestCase</label>
              <label className='text-lg font-semibold text-gray-700 dark:text-gray-300'>Test Result</label>
            </div>
            <textarea
              value={testCase}
              onChange={(e) => setTestCase(e.target.value)}
              className='w-full mt-2 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              rows='5'
              placeholder='Enter test case here...'
            />
            <span>{output}</span>
          </div>
        </div>
      </div>

      {/* Code Section */}
      <div className='col-span-1 lg:col-span-8'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
          <label className='text-lg font-semibold text-gray-700 dark:text-gray-300'>Your Code</label>

          {/* Language Selector */}
          <select
            id='language'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200'
          >
            <option value='python3'>Python 3</option>
            <option value='c'>C</option>
            <option value='cpp'>C++</option>
            <option value='java'>Java</option>
            <option value='nodejs'>JavaScript (Node.js)</option>
          </select>

          {/* Code Input Area */}
          <textarea
            className='w-full mt-4 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            rows='25'
            placeholder='Enter your code here...'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {/* Submit Button */}
          <div className='flex justify-end'>
            <button
              className='mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200'
              onClick={handleSubmit}
            >
              Run Code
            </button>
          </div>
        </div>
      </div>

      {/* Test Case for Mobile */}
      <div className='col-span-1 lg:col-span-8 lg:hidden'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
          <div className='flex justify-between w-48'>
            <label className='text-lg font-semibold text-gray-700 dark:text-gray-300'>TestCase</label>
            <label className='text-lg font-semibold text-gray-700 dark:text-gray-300'>Test Result</label>
          </div>
          <textarea
            value={testCase}
            onChange={(e) => setTestCase(e.target.value)}
            className='w-full mt-2 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            rows='5'
            placeholder='Enter test case here...'
          />
        </div>
      </div>
    </div>
  );
}

export default PeerToPeer;
