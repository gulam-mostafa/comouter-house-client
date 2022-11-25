import { Card, Dropdown } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const AllsellerCard = ({ seller }) => {
    const { name, createdAt, email, photoURL } = seller

    return (
        <div className=''

        >

            <div className="max-w-sm ">
                <Card>
                    <div className="flex justify-end px-4 pt-4 ">
                        <Dropdown
                            inline={true}
                            label=""
                        >
                            <Dropdown.Item>
                                <Link
                                    href="#"
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Edit
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                    href="#"
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Export Data
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                    href="#"
                                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Delete
                                </Link>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className="flex flex-col items-center pb-10">

                        {
                            photoURL ? (
                                <img className='h-10 w-10 rounded-full' src={photoURL} alt="" />
                            ) :
                                (
                                    <img className='h-10 w-10' src='https://i.ibb.co/YWyS5Mj/avatar.png' alt="" />
                                )
                        }
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {email}
                        </span>
                        <small>Join Date {createdAt.slice(0, 10)}</small>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <Link
                                href="#"
                                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add friend
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                            >
                                Message
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>




        </div>
    );
};

export default AllsellerCard;