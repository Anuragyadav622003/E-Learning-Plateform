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
import Settings from '../Settings/Settings';


function AdminRoute() {
    const router = createBrowserRouter([
          {
            path:'/',
            element:<AdminLayout/>,
     
            children:[
                {
                    index:true,
                    path:'/admin/dashboard',
                    element:<Dashboard/>

                },
                {
                    
                    path:'/admin/courses/create',
                    element:<CourseCreate/>
                },
                {
                    path:'/admin/users',
                    element:<User/>
                },
                {
                    path:'/admin/assignments',
                    element:<Assignments/>
                },
                {
                    path:'/admin/quizzes',
                    element:<Quizzes/>
                },
                {
                    path:'/admin/reports',
                    element:<Reports/>
                },
                {
                    path:'/admin/helps_supports',
                    element:<Helps_Support/>
                },
                {
                    path:'/admin/settings',
                    element:<Settings/>
                }
            ]


          }
    ]);
    return  <RouterProvider router = {router}/>
}

export default AdminRoute;