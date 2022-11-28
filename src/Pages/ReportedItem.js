import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { toast } from 'react-toastify';

const ReportedItem = () => {
    const [users1, setUsers1] = useState(null)

    const { data: reported = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/itemsrep?roles=reported`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();


            return data;
        }
    })
    // console.log(reported[0])

    const handleDelete = id => {
        const sureDelete = window.confirm("Are Your Sure, you want delete")
        if (sureDelete) {
            fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/items/delete/${id}`,
                {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);

                    if (data.deletedCount > 0) {
                        // alert(" delete successfully")
                        toast("delete successfully", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        const remaning = users1.filter(revw => revw._id !== id)
                        setUsers1(remaning)

                    }
                    refetch()
                })
        }
    }



    // console.log(reported)
    return (
        <div>
            <div>
                <Table striped={true}>
                    <Table.Head>
                        <Table.HeadCell>
                            image
                        </Table.HeadCell>
                        <Table.HeadCell>
                           item
                        </Table.HeadCell>
                        <Table.HeadCell>
                           location
                        </Table.HeadCell>
                        <Table.HeadCell>
                            post item
                        </Table.HeadCell>
                        <Table.HeadCell>
                          category
                        </Table.HeadCell>
                        <Table.HeadCell>
                            delete
                            <span className="sr-only text-red-500">
                                Edit
                            </span>
                        </Table.HeadCell>
                    </Table.Head>
                    {
                        reported?.map(report => <Table.Body className="divide-y" key={report._id}>
                            <Table.Row className="bg-white dark:breport-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900  dark:text-white">
                                    <img className='rounded-full w-10 h-10 ' src={report.img} alt="" />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {report.title}
                                </Table.Cell>
                                <Table.Cell>
                                    {report.location}
                                </Table.Cell>
                                <Table.Cell>
                                    {report.createdAt.slice(0, -14)}
                                </Table.Cell>
                                <Table.Cell>
                                    {report.types}
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        onClick={() => handleDelete(report._id)}
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>




                        </Table.Body>)
                    }
                </Table>
            </div>
        </div>
    );
};

export default ReportedItem;