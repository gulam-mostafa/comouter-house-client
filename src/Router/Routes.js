
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
 
export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: ({ params }) => fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/items/${params.id}`)
            },
            {
                path: '/home',
                element: <Home></Home>,
                loader: () => fetch('https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/category'),
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
                loader: ({ params }) => fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/items/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/myorder',
                element: <MyOrder></MyOrder>
            }
        ]
        
    }
    ,{
        path: '*',
        element: (<p className='w-1/2 mx-auto my-auto ' >not found page <Link className='btn' to='/'>Home</Link></p>)
    }
])