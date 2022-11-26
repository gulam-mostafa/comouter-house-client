
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
import AllSeller from '../Pages/AllSeller';
import AdminRoute from './AdminRoute';
import AllBuyer from '../Pages/AllBuyer';
import ReportedItem from '../Pages/ReportedItem';
import AddItem from '../Pages/AddItem';
import MyWishList from '../Pages/MyWishList';
import MyBuyer from '../Pages/MyBuyer';
 
export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                // loader: ({ params }) => fetch(`http://192.168.1.103:5000?/items?/${params?.id}`)
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
                element: <MyOrder></MyOrder>
            },
            {
                path : '/dashboard/myorder',
                element: <MyOrder></MyOrder>
            },
            {
                path : '/dashboard/allseller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>,
                loader: () => fetch('http://192.168.1.103:5000/users'),
            },
            {
                path : '/dashboard/allbuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>,
                loader: () => fetch('http://192.168.1.103:5000/users'),
            },
            {
                path : '/dashboard/reported',
                element: <AdminRoute><ReportedItem></ReportedItem></AdminRoute>,
                loader: () => fetch('http://192.168.1.103:5000/users'),
            },
            {
                path : '/dashboard/additem',
                element: <AddItem></AddItem>,
               
            },
            {
                path : '/dashboard/wish',
                element: <MyWishList></MyWishList>,
               
            },
            {
                path : '/dashboard/mybuyer',
                element: <MyBuyer></MyBuyer>,
               
            },
        ]
    }
])