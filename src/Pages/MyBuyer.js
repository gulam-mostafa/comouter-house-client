import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import React, { useContext } from 'react';
import { AuthContext } from '../Components/Context/AuthProvider';

const MyBuyer = () => {

    const { user } = useContext(AuthContext)

    const { data: buyers = [], refetch } = useQuery({

        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://192.168.1.103:5000/orders/mybuyer?sellermail=${user?.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();


            return data;
        }
    })
// console.log(buyers)
    return (
        <div>
            <p className='text-center text-3xl my-4' >Your Total Buyer <span className='text-red-400'>{buyers.length}</span> People</p>
            <div>


                <Table striped={true}>
                    <Table.Head>
                        <Table.HeadCell>
                           Buyer
                        </Table.HeadCell>
                        <Table.HeadCell>
                            item name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            email
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Category
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Price
                        </Table.HeadCell>
                        <Table.HeadCell>
                            date
                            <span className="sr-only text-red-500">
                                Edit
                            </span>
                        </Table.HeadCell>
                    </Table.Head>
                    {
                        buyers?.map(buyer => <Table.Body className="divide-y" key={buyer._id}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900  dark:text-white">
                                   <p>{buyer.displayName}</p>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {buyer.title}
                                </Table.Cell>
                                <Table.Cell>
                                    {buyer.email}
                                </Table.Cell>
                                <Table.Cell>
                                    {buyer.types}
                                </Table.Cell>
                                <Table.Cell>
                                   $ {buyer.price}
                                </Table.Cell>
                                <Table.Cell>
                                    <a
                                        href="/tables"
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        {buyer.createdAt?.slice(0,10)}
                                    </a>
                                </Table.Cell>
                            </Table.Row>




                        </Table.Body>)
                    }
                </Table>



            </div>
        </div>
    );
};

export default MyBuyer;