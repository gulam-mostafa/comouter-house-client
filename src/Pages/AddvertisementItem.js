import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';
import React from 'react';

const AddvertisementItem = () => {

    const { data: ads = [], refetch } = useQuery({
        queryKey: ['ads'],

        queryFn: async () => {
            const res = await fetch(`http://192.168.1.103:5000/itemsads?ads=ads`);
            const data = await res.json();

            return data;
        }
    })
 


    return (
       
           
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 content-center'>
                {
                    ads.map(ad => <div className="">
                        <Card imgSrc={ad.img}>
                            <div className='flex justify-between'>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {ad.title}
                            </h5>
                                <img className='w-14 '  src="https://i.ibb.co/7yYvkZc/81339-live-pulse.gif" alt="" />
                            </div>
                           
                            <p className="font-normal text-gray-700 dark:text-gray-400">{ad.location}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{ad.condition}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Post Date: {ad.createdAt.slice(0,10)} Time {ad.createdAt.slice(11,-5)}</p>
                            <div className='flex justify-around'>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Price $ {ad.price}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Price $ {ad.rating}</p>
                            </div>
                        </Card>
                    </div>)
                }
            </div>
       
    );
};

export default AddvertisementItem;