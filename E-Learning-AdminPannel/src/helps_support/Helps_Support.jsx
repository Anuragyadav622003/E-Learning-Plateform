// src/components/HelpSupport.js

import React from 'react';

const HelpSupport = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Help & Support</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
                <ul className="list-disc pl-5">
                    <li>
                        <strong>How can I reset my password?</strong>
                        <p>You can reset your password by going to the login page and clicking on 'Forgot Password?'.</p>
                    </li>
                    <li>
                        <strong>How can I contact support?</strong>
                        <p>You can contact support by emailing support@example.com or using the contact form below.</p>
                    </li>
                    <li>
                        <strong>Where can I find tutorials?</strong>
                        <p>Tutorials can be found in the 'Resources' section of our website.</p>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="support-email">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="support-email"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HelpSupport;
