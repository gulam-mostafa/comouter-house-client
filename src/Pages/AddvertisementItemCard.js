import { useQuery } from '@tanstack/react-query';
import { Button, Card } from 'flowbite-react';
import React from 'react';

const AddvertisementItemCard = ({ ad }) => {


    // console.log('my check', ad)
    const { data: selleruser = [], } = useQuery({
        queryKey: ['selleruser'],

        queryFn: async () => {
            const res = await fetch(`http://192.168.1.103:5000/users?account=seller`);
            const data = await res.json();

            return data;
        }
    })
    console.log(ad)


    return (
        <div>

            <div className="" >
                <Card imgSrc={ad.img} >


                    <div className='flex justify-between'>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ad.displayName}</h5>
                        {ad.role &&
                            <img className='w-12' src="https://i.ibb.co/1bSH6hb/check.png" alt="" />
                        }
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{ad.email}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{ad.condition}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Post Date: {ad.createdAt.slice(0, 10)} Time {ad.createdAt.slice(11, -5)}</p>
                    <div className='flex justify-around'>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Price $ {ad.price}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Price $ {ad.rating}</p>
                    </div>
                    <Button>Book now</Button>
                </Card>
            </div>

        </div>
    );
};

export default AddvertisementItemCard;