import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTitle } from '../Components/Hooks/useTitle';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    useTitle('Payment ')


    const orders = useLoaderData()
    const {name, title, img ,location, createdAt, types, displayName, PhotoURl, price, } = orders
    // console.log('check', price)
    // console.log('b', orders._id)
    return (
        <div className='mx-4'>
            <h3>Payment for {title}</h3>
            <p className="tetx-xl">Payment Amount <strong> {price} </strong></p>
            
            <div className='w-96 my-2 m-auto mx- text-black'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm 
                    orders={orders}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;