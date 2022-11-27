import React, { useContext } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import Navbar1 from '../../Home/Navbar/Navbar1';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/UseSeller';
import Loading from '../Loading';

const DashboardLayoyt = () => {
  const { user, loading } = useContext(AuthContext)
  // const sellerUser = useLoaderData()
  // console.log(sellerUser)
  const [isAdmin] = useAdmin(user?.email)
  const [isSeller] = useSeller(user?.email)

  console.log(isSeller, user.email)
  return (
    <div className=''>
      <Navbar1></Navbar1>
      <button>{/* dashboard butto  */}
        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost bg-red-400 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>

        </label></button>
      <div className="drawer drawer-mobile ">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>


        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 text-base-content bg-gray-400 lg:bg-white">

            <li ><Link to='/dashboard'> Seller</Link></li>
            {
              <>

                {
                  !isSeller && <>
                    <li ><Link to='/dashboard/wish'>My wish List</Link></li>
                    <li ><Link to='/dashboard/myorder'> My Order</Link></li>


                  </>
                }

                {
                  isAdmin && <>

                    <li ><Link to='/dashboard/allbuyer'> All Buyer</Link></li>
                    <li ><Link to='/dashboard/allseller'> All Seller</Link></li>
                    <li ><Link to='/dashboard/reported'> Reported Items</Link></li>

                    <li ><Link to='/dashboard/mybuyer'>My Buyer</Link></li>

                  </>
                }

                {isSeller && !isSeller &&
                  <>
                    <li ><Link to='/dashboard/additem'> Add a item</Link></li>
                    <li ><Link to='/dashboard/myallproduct'>My All Products</Link></li>

                  </>
                }

              </>

            }

          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayoyt;