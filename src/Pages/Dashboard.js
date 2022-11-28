import { Sidebar } from 'flowbite-react';
import React, { useContext } from 'react';
import { AuthContext } from '../Components/Context/AuthProvider';
import useAdmin from '../Components/Hooks/useAdmin';
import useSeller from '../Components/Hooks/UseSeller';
import { useTitle } from '../Components/Hooks/useTitle';
import AllSeller from './AllSeller';
import MyAllProduct from './MyAllProduct';
import MyOrder from './MyOrder';

const Dashboard = () => {
   useTitle('Dashboard ')

    const { user, loading } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    return (
        <div className='mx-10 m-auto'>
            
           <h2 className='text-center text-xl'>My Dashboard</h2>

         {
            !isAdmin && !isSeller && 
            <MyOrder></MyOrder>
         }
         {
            !isAdmin && isSeller && 
           <MyAllProduct></MyAllProduct>
         }
         {
            isAdmin && 
           <AllSeller></AllSeller>
         }
        </div>
    );
};

export default Dashboard;