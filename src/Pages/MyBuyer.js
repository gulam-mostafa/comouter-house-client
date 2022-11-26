import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Components/Context/AuthProvider';

const MyBuyer = () => {

    const {user} = useContext(AuthContext)

    const { data: users = [], refetch } = useQuery({
        
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://192.168.1.103:5000/orders/mybuyer?sellermail=${user?.email}`);
            const data = await res.json();


            return data;
        }
    })

    return (
        <div>
            <p>{users.length}</p>
        </div>
    );
};

export default MyBuyer;