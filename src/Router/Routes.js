
import React from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Main from '../Components/Main/Main';
import Home from '../Home/Home';

import SignUp from '../Log&Reg/SignUp';
import TremsAndCondition from '../Components/TremsAndCondition';
import Login from '../Log&Reg/Login';
import Blog from '../Components/Context/Blog';
import PriveteRouter from './PriveteRouter';
import { Button } from 'flowbite-react';
import SubCategory from '../Pages/SubCategory';
import Dashboard from '../Pages/Dashboard';
import MyOrder from '../Pages/MyOrder';
import PageNotFound from '../Components/PageNotFound';
import DashboardLayoyt from '../Components/Main/DashboardLayoyt';
 
export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: ({ params }) => fetch(`http://192.168.1.103:5000/items/${params.id}`)
            },
            {
                path: '/home',
                element: <Home></Home>,
                loader: () => fetch('http://192.168.1.103:5000/category'),
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/terms',
                element: <TremsAndCondition></TremsAndCondition>
            },
            {
                path: '/blog',
                element: <PriveteRouter><Blog></Blog></PriveteRouter>
            },
            {
                path: '/subcategory/:id',
                element: <SubCategory></SubCategory>,
                loader: ({ params }) => fetch(`http://192.168.1.103:5000/items/${params.id}`)
            },
          
            {
                path: '/myorder',
                element: <MyOrder></MyOrder>
            }
        ]
        
    }
    ,{
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
    {
        path: '/dashboard',
        element: <PriveteRouter><DashboardLayoyt></DashboardLayoyt></PriveteRouter>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path : '/dashboard/myorder',
                element: <MyOrder></MyOrder>
            }
        ]
    }
])