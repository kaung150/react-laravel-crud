import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Users from './views/Users';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuessLayout from './components/GuessLayout';
import UserForm from './views/UserForm';

const router = createBrowserRouter([


    {
        path: '/',
        element: <DefaultLayout />,
        children: [

            {
                path: '/dashboard',
                element: <Dashboard />
            },

            {
                path: '/',
                element: <Navigate to="/users" />
            },

            {
                path: '/users',
                element: <Users />
            },


            {
                path: '/products/new',
                element: <UserForm key='userCreate' />
            },


            {
                path: '/products/:id',
                element: <UserForm key='userUpdate' />
            },


        ]
    },

    {
        path: '/',
        element: <GuessLayout />,
        children: [

            {
                path: '/login',
                element: <Login />
            },

            {
                path: 'signup',
                element: <Signup />
            },
        ]
    },


    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
