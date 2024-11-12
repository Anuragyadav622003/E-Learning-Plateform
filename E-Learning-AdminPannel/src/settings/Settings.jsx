// src/components/AdminSettings.js

import React, { useState } from 'react';

const AdminSettings = () => {
    // State for various settings
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [courseSettings, setCourseSettings] = useState({
        defaultDuration: '',
        visibility: 'public',
    });

    const [userManagement, setUserManagement] = useState({
        role: 'admin',
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: false,
        pushNotifications: false,
    });

    const [paymentSettings, setPaymentSettings] = useState({
        gateway: 'PayPal',
        currency: 'USD',
    });

    const [branding, setBranding] = useState({
        logo: '',
        themeColor: '#ffffff',
    });

    // Handlers for each settings change
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleCourseSettingsChange = (e) => {
        const { name, value } = e.target;
        setCourseSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleUserManagementChange = (e) => {
        const { name, value } = e.target;
        setUserManagement((prev) => ({ ...prev, [name]: value }));
    };

    const handleNotificationsChange = (e) => {
        const { name, checked } = e.target;
        setNotifications((prev) => ({ ...prev, [name]: checked }));
    };

    const handlePaymentSettingsChange = (e) => {
        const { name, value } = e.target;
        setPaymentSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleBrandingChange = (e) => {
        const { name, value } = e.target;
        setBranding((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle settings submission (API calls)
        console.log('Settings submitted:', {
            profile,
            courseSettings,
            userManagement,
            notifications,
            paymentSettings,
            branding,
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Admin Settings</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {/* Profile Settings */}
                <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={profile.password}
                        onChange={handleProfileChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Course Settings */}
                <h3 className="text-xl font-semibold mb-2">Course Settings</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="defaultDuration">
                        Default Course Duration (hours)
                    </label>
                    <input
                        type="number"
                        name="defaultDuration"
                        id="defaultDuration"
                        value={courseSettings.defaultDuration}
                        onChange={handleCourseSettingsChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="visibility">
                        Course Visibility
                    </label>
                    <select
                        name="visibility"
                        id="visibility"
                        value={courseSettings.visibility}
                        onChange={handleCourseSettingsChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                {/* User Management */}
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="role">
                        Default User Role
                    </label>
                    <select
                        name="role"
                        id="role"
                        value={userManagement.role}
                        onChange={handleUserManagementChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                {/* Notifications */}
                <h3 className="text-xl font-semibold mb-2">Notifications</h3>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="emailAlerts"
                            checked={notifications.emailAlerts}
                            onChange={handleNotificationsChange}
                            className="mr-2"
                        />
                        Enable Email Alerts
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="pushNotifications"
                            checked={notifications.pushNotifications}
                            onChange={handleNotificationsChange}
                            className="mr-2"
                        />
                        Enable Push Notifications
                    </label>
                </div>

                {/* Payment Settings */}
                <h3 className="text-xl font-semibold mb-2">Payment Settings</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="gateway">
                        Payment Gateway
                    </label>
                    <select
                        name="gateway"
                        id="gateway"
                        value={paymentSettings.gateway}
                        onChange={handlePaymentSettingsChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="PayPal">PayPal</option>
                        <option value="Stripe">Stripe</option>
                        <option value="Square">Square</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="currency">
                        Currency
                    </label>
                    <select
                        name="currency"
                        id="currency"
                        value={paymentSettings.currency}
                        onChange={handlePaymentSettingsChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="INR">INR</option>
                    </select>
                </div>

                {/* Branding Settings */}
                <h3 className="text-xl font-semibold mb-2">Branding</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="logo">
                        Logo URL
                    </label>
                    <input
                        type="text"
                        name="logo"
                        id="logo"
                        value={branding.logo}
                        onChange={handleBrandingChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="themeColor">
                        Theme Color
                    </label>
                    <input
                        type="color"
                        name="themeColor"
                        id="themeColor"
                        value={branding.themeColor}
                        onChange={handleBrandingChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default AdminSettings;
