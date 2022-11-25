import { accent } from 'daisyui/src/colors';
import { Card, Dropdown } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Components/Context/AuthProvider';
import AllsellerCard from './AllsellerCard';


const AllSeller = () => {
    const sellerUsers = useLoaderData()
    const { user } = useContext(AuthContext)
    const [sellers, setSellers] = useState([])
    const allSellers = sellerUsers[0].account
    // console.log(sellerUsers[0].account)
    console.log(sellers)


    useEffect(() => {
        fetch(`http://192.168.1.103:5000/users?account=${allSellers}`)
            .then(res => res.json())
            .then(data => {
                setSellers(data)
            })


    }, [])

    return (
        <div className=''>
            <p>Total Sellers {sellers.length}</p>

           <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2 mx-auto place-items-center'>
           {
                sellers.map(seller => <AllsellerCard key={seller.email}
                seller={seller}
                >


                </AllsellerCard> )
            }
           </div>
        </div>
    );
};

export default AllSeller;