import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Components/Context/AuthProvider';
import Loading from '../Components/Loading';
import CategoryCard from '../Home/CategoryCard';
import Home from '../Home/Home';
import OrderModal from './OrderModal';
import SubCategoryCard from './SubCategoryCard';

const Subitem = () => {
    const {user} = useContext(AuthContext)
    const selectedItems = useLoaderData()
    const types = selectedItems[0].types
    const [itemData, setItemData] = useState(null)
    const [product, setProduct] = useState([]);
    // console.log(items)
    const [item, setItem] = useState({});
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/items/${types}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setItems(data)
    //             setLoading(false)

    //         })
    // }, [])
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products', types],
        queryFn: async () => {
            const res = await fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/items/${types}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='lg:px-16 px-4 mb-4'>
            <h1 className='text-xl text-center my-5 text-green-500 font-bold'>Total Items {products.length}</h1>
            <h1 className='text-xl text-center my-5 text-green-500 font-bold'>Item's Of {types} </h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>


                {
                    products.map(item => <SubCategoryCard
                        item={item}
                        key={item._id}
                        refetch={refetch}
                        // setProduct={setProduct}
                        setItemData={setItemData}

                    ></SubCategoryCard>)
                }
            </div>
            {
                itemData && <OrderModal
                    itemData={itemData}
                    refetch={refetch}
                    setItemData={setItemData}

                ></OrderModal>
            }

        </section>
    );
};

export default Subitem;