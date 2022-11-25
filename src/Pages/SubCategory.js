import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Loading from '../Components/Loading';
import CategoryCard from '../Home/CategoryCard';
import Home from '../Home/Home';
import OrderModal from './OrderModal';
import SubCategoryCard from './SubCategoryCard';



const Subitem = () => {



    const selectedItems = useLoaderData()
    const types = selectedItems[0].types
    // console.log(selectedItems.length)
    const [items, setItems] = useState([]);
    const [product, setProduct] = useState([]);


    // console.log(items)
    const [item, setItem] = useState({});



    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`http://192.168.1.103:5000/items/${types}`)
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setLoading(false)



            })
    }, [])
    if (loading) {
        return <h1 className='text-center mt-32'><Loading></Loading></h1>
    }

    return (
        <section className='lg:px-16 px-4 mb-4'>
            <h1 className='text-xl text-center my-5 text-green-500 font-bold'>Total Items {items.length}</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>


                {
                    items.map(item => <SubCategoryCard
                        item={item}
                        key={item._id}
                        setProduct={setProduct}

                    ></SubCategoryCard>)
                }
            </div>


        </section>
    );
};

export default Subitem;