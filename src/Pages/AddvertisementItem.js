import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';
import React, { useContext } from 'react';
import { AuthContext } from '../Components/Context/AuthProvider';
import AddvertisementItemCard from './AddvertisementItemCard';

const AddvertisementItem = () => {
    const {selleruser} = useContext(AuthContext)

    const { data: ads = [], refetch } = useQuery({
        queryKey: ['ads'],

        queryFn: async () => {
            const res = await fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/itemsads?ads=ads`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            

            return data;
        }
    })

    

  
 
// console.log(ads)

    return (
       
           
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 content-center'>
                {
                    ads.map(ad =><AddvertisementItemCard
                    ad={ad}
                    key={ad._id}
                    ></AddvertisementItemCard>)
                }
            </div>
       
    );
};

export default AddvertisementItem;