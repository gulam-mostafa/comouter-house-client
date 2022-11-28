import { Table } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Components/Context/AuthProvider';
import Loading from '../Components/Loading';

const MyOrder = () => {
    const [orders, setOrders] = useState();
    const { user, logOut, } = useContext(AuthContext)
    const [loader, setLoader] = useState(false)
    console.log(orders)

    useEffect(() => {
        fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }


        })
            .then(res => {
                // if (res.status === 401 || res.status === 403) {
                //     logOut()
                // }
                setLoader(true)
                return res.json()


            })
            .then(data => {
                // setLoading(false);
                setOrders(data)
                setLoader(false)
            })

    }, [user?.email])

    return (
        <div className='mx-10 my-8'>
            {
                loader ? (
                    <Loading></Loading>
                ) : (
                    <Table striped={true}>
                        <Table.Head>
                            <Table.HeadCell>
                                image
                            </Table.HeadCell>
                            <Table.HeadCell>
                                item name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Color
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Category
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Price
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Payment
                                <span className="sr-only text-red-500">
                                    Payment
                                </span>
                            </Table.HeadCell>
                        </Table.Head>
                        {
                            orders?.map(order => <Table.Body className="divide-y" key={order._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900  dark:text-white">
                                        <img className='rounded-full w-10 h-10 ' src={order.img} alt="" />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {order.title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {order.color}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {order.types}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {order.price}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            !order.paid && <Link
                                                to={`/dashboard/payment/${order._id}`}
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                Pay
                                            </Link>
                                        }
                                        {
                                            order.paid && <Link
                                                to={`/dashboard/payment/${order._id}`}
                                                className="font-medium text-green-600 hover:underline dark:text-blue-500"
                                            >
                                                Paid
                                            </Link>
                                        }



                                    </Table.Cell>
                                </Table.Row>




                            </Table.Body>)
                        }
                    </Table>
                )
            }
        </div>
    );
};

export default MyOrder;