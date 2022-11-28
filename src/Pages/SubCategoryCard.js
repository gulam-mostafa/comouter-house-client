import { Card } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Components/Context/AuthProvider';
import '../Home/Navbar/Navbar.css'
import OrderModal from './OrderModal';

const SubCategoryCard = ({ item, setProduct, setItemData ,refetch }) => {
    const { user } = useContext(AuthContext)
    const { name, img, area, Condition, _id, color, email: email1,  orginal_price, price, rating, createdAt, location, title, types, } = item
    // console.log(price)


    // handle reporded 
    const handleRepotedUsers = id => {
        fetch(`http://192.168.1.103:5000/items/report/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    toast("Reported to admin", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            })
    };
    const wishItem = { name, img, area, Condition, color, orginal_price, price, rating, createdAt: new Date().toISOString(), location, title, types, email: user?.email }
    // console.log(wishItem)
    // handle wishlist
    const handleWishList = id => {
        fetch(`http://192.168.1.103:5000/wish`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishItem)
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


    return (
        <div>
            <div className="">
                <div className='border rounded-xl px-1 py-1'

                >
                    <div className='max-w- sm max-h- sm'>
                        <img className=' m-auto rounded-xl w-1/2 mb-2 max- h-1/4' src={img} alt="" />
                        <div className='flex  justify-between mx-4 '>
                            <button onClick={() => handleRepotedUsers(_id)} className='btn btn-xs btn-secondary'>Report to Admin</button>
                            <button onClick={() => handleWishList(_id)}><img className=' hover:bg-gray-300 m-auto rounded-xl w-8 h-8 mb-2 ' src='https://i.ibb.co/SX8fMMk/heart.png' alt="" /></button>
                        </div>

                    </div>
                    <Link href="#">
                        <h5 className="text-xl mb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                    </Link>
                    <Link >
                        <p className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                            <small>Sale for {user?.displayName}</small>
                        </p>
                        <p className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                            <small> {email1}</small>
                        </p>
                        <p className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                            <small>Location {location}, {area}</small>
                        </p>
                        <p className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                            <small>Date {createdAt.slice(0, 10)}</small>
                            <small> time {createdAt.slice(11, -8)}</small>
                        </p>
                        <p ><small className='bg-yellow-50'>category: {types}</small></p>
                    </Link>
                    <div className="mt- flex flex-col xl:flex-row items-left">


                        <p className="mr-2 mb-1 md:mb-0 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                            Rating: {rating}/ 5.0
                        </p>

                        <span className="mr-2 ml- rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                            New Orginal Price: $ {orginal_price}
                        </span>

                    </div>
                    <div className='  md:flex items-center my-1'>
                        <p className='mr-2 ml- mb-1 md:mb-0 rounded bg-blue-100 px-2.5 py- text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800'>Color: {color}</p>
                        <p className='mr-2 ml- rounded bg-blue-100 px-2.5 py- text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800'>Condition: {Condition}</p>
                    </div>
                    <div className="flex  md:flex-row my-4 gap-3 flex-col items-center justify-around">
                        <span className="text- font-bold text-gray-900 dark:text-white">
                            Price: $ {price}
                        </span>
                        {/* <Link

                            className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4
                             focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          
                        </Link> */}

                        {
                            user?.uid ?
                                (<div className="">
                                    <label
                                        htmlFor="Add-modal"
                                        className="btn btn-primary bgColor textColor "
                                        onClick={() => setItemData(item)}
                                    >  BooK now</label>

                                </div>) :
                                (
                                    <Link to='/login' className='btn btn-primary btn-xs'>sign in after buy</Link>
                                )
                        }

                    </div>
                 
                </div>
            </div>
        </div>
    );
};

export default SubCategoryCard;