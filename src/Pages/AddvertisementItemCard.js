import { useQuery } from '@tanstack/react-query';
import { Button, Card } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Components/Context/AuthProvider';

const AddvertisementItemCard = ({ ad }) => {
    // console.log('advertise', ad)
    const {user} =useContext(AuthContext)

const {name, img, area, Condition, _id:id, color, email: email1,  orginal_price, price, rating, createdAt, location, title, types,} =ad


const adsToBooking = { name, img, area, Condition, color, orginal_price, id, price, rating, createdAt: new Date().toISOString(), location, title, types, email: user?.email }
    const handleWishList = id => {
        fetch(`http://192.168.1.103:5000/order`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adsToBooking )
        }).then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    //    alert('order success')
                    toast("added to whs list", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                else {
                    toast.error(data.message)
                }
            })
            
    };


    // console.log('my check', ad)
    const { data: selleruser = [], } = useQuery({
        queryKey: ['selleruser'],

        queryFn: async () => {
            const res = await fetch(`http://192.168.1.103:5000/users?account=seller`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();

            return data;
        }
    })
    // console.log(ad)


    return (
        <div>

            <div className="" >
                <Card imgSrc={ad.img} >


                    <div className='flex justify-between'>
                        <h5 className="text-sm  tracking-tight text-gray-900 dark:text-white">Seller name: {ad.displayName}</h5>
                        {ad.role &&
                            <img className='w-12 ' src="https://i.ibb.co/1bSH6hb/check.png" alt="" />
                        }
                    </div>
                    <p className="font-normal text-gray-700 text-xs dark:text-gray-400"> Seller Email: {ad.email}</p>
                    <p className=" text-xl font-bold text-gray-700 dark:text-gray-400">{ad.title}</p>
                   
                    <p className="font-normal text-gray-700 dark:text-gray-400">{ad.types}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Condition: {ad.condition}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{ad.description?.slice(0,200)}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Post Date: {ad.createdAt?.slice(0, 10)} Time {ad.createdAt?.slice(11, -5)}</p>
                    <div className='flex justify-around'>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Price $ {ad.price}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Price $ {ad.rating}</p>
                    </div>
                    <Button 
                    onClick={() => handleWishList(id)}
                    >Book now</Button>
                </Card>
            </div>

        </div>
    );
};

export default AddvertisementItemCard;