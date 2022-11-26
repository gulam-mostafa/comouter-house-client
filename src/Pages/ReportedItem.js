import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';

const ReportedItem = () => {

    const { data: reported = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await fetch(`http://192.168.1.103:5000/itemsrep?roles=reported`);
            const data = await res.json();


            return data;
        }
    })

    
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

export default ReportedItem;