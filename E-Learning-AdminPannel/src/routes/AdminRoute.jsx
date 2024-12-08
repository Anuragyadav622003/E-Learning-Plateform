import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CourseCreate from '../pages/courses/CourseCreate';
import AdminLayout from '../component/AdminLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import User from '../user/User';
import Helps_Support from '../helps_support/Helps_Support';
import Assignments from '../pages/assignments/Assignments';
import Quizzes from '../pages/quizzes/Quizzes';
import Reports from '../reports/Reports';
import Settings from '../settings/Settings';
import Home from '../Home/Home';

function AdminRoute() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,  // Home page will lead to admin
        },
        {
            path: '/admin',
            element: <AdminLayout />,  // Admin layout will wrap dashboard and other pages
            children: [
                {
                    index: true,  // This makes the dashboard load by default
                    path:'dashboard',
                    element: <Dashboard />
                },
                {
                    path: 'courses/create',
                    element: <CourseCreate />
                },
                {
                    path: 'users',
                    element: <User />
                },
                {
                    path: 'assignments',
                    element: <Assignments />,
                    loader:null
                },
                {
                    path: 'quizzes',
                    element: <Quizzes />
                },
                {
                    path: 'reports',
                    element: <Reports />
                },
                {
                    path: 'help_support',
                    element: <Helps_Support />
                },
                {
                    path: 'settings',
                    element: <Settings />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default AdminRoute;
