import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';

const AllBuyer = () => {
    const buyerUser = useLoaderData()
    const allbuyer= buyerUser[0].account
    
   
  
    const {data: users = [] , refetch} = useQuery({
        queryKey: ['users'],
       
        queryFn: async() =>{
            const res = await fetch(`http://192.168.1.103:5000/users?account=buyer`);
            const data = await res.json();
          
            return data;    }
        })
console.log(users)
    return (
        <div>
            <div>
            <Table striped={true}>
                        <Table.Head>
                            <Table.HeadCell>
                                image
                            </Table.HeadCell>
                            <Table.HeadCell>
                                 name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                email
                            </Table.HeadCell>
                            <Table.HeadCell>
                                join date
                            </Table.HeadCell>
                            <Table.HeadCell>
                                types
                            </Table.HeadCell>
                            <Table.HeadCell>
                                delete
                                <span className="sr-only text-red-500">
                                    Edit
                                </span>
                            </Table.HeadCell>
                        </Table.Head>
                        {
                            users?.map(buyer => <Table.Body className="divide-y" key={buyer._id}>
                                <Table.Row className="bg-white dark:bbuyer-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900  dark:text-white">
                                        <img className='rounded-full w-10 h-10 ' src={buyer.photoURL} alt="" />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {buyer.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {buyer.email}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {buyer.createdAt.slice(0,-14)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {buyer.account}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <a
                                            href="/tables"
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                           delete
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

export default AllBuyer;