import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import './Navbar/Navbar.css'

const CategoryCard = ({ category, loading , totalItems,}) => {
    const { name, total, img ,  types, _id} = category
   
    return (
        <div className='my-4  '>
            
         
            <div className="card flex flex-row justify-center align-middle  bg-pink-600 shadow-2xl">
                <div className='w-1/3 h-1/2 my-auto'><img className='lg: p-2 my-auto  h-1/4. lg:h-1/3. w-1/2.  rounded-xl' src={img} alt="Movie" />
                </div>

                <div className="py-4 text-center text-yellow-200 w-full  rounded-xl" >
                    <h2 className="text-2xl pb-1 font-semibold  text-center text-yellow-200">{name}</h2>

                    <div className="card-action flex justify-around  flex-col">
                        <p className='mb-4 '>Total Item: {total}</p>
                        <p className='mb-4 '>Category: {types}</p>
                       
                        <Link to={`/subcategory/${types}`}> <button className="btn bgColor md:w-1/3 m-auto textColor ">See ALl</button></Link>

                    </div>
                </div>
            </div>




        </div>
    );
};

export default CategoryCard;