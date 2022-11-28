import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Components/Context/AuthProvider';

const MyAllProduct = () => {
    const { user } = useContext(AuthContext)
    const [users1, setUsers1] = useState(null)

    const { data: allProducts = [], refetch } = useQuery({
        queryKey: ['allProducts'],

        queryFn: async () => {
            const res = await fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/myallproducts?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();

            return data;
        }
    })

    const handleAdvertise = id => {
        fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/items/ad/${id}`, {

            method: "PUT",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    toast("Your product is live", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    refetch()
                }

            })

    };

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
                        toast("your Item delete successfully", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        const remaning = users1.filter(revw => revw._id !== id)
                        setUsers1(remaning)

                        refetch()
                    }
                })
        }
    }


    return (
        <div>

            <p className='text-center text-blue-red-500 text-3xl py-6 '>My all items {allProducts.length} </p>
            <div>
                <Table striped={true}>
                    <Table.Head>
                        <Table.HeadCell>
                            number
                        </Table.HeadCell>
                        <Table.HeadCell>
                            name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Appearance
                        </Table.HeadCell>
                        <Table.HeadCell>
                            join date
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Category
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Ads.
                        </Table.HeadCell>
                        <Table.HeadCell>
                            delete

                        </Table.HeadCell>
                    </Table.Head>
                    {
                        allProducts?.map((product, i) => <Table.Body className="divide-y" key={product._id}>
                            <Table.Row className="bg-white dark:bbuyer-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900  dark:text-white">
                                    <p>{i + 1}</p>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.title}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.color}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.createdAt?.slice(0, -14)}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.types}
                                </Table.Cell>
                                <Table.Cell>


                                    {
                                        product.ads === 'ads' ? (
                                            <p>Live</p>
                                        ) :
                                           (
                                            product.total === 1? 
                                            <p>Sold</p> : <button
                                            onClick={() => handleAdvertise(product._id)}
                                             className=" text-blue-600 hover:underline btn lg:btn-xs   text-white"
                                         > Ads.</button>
                                           )
                                           
                            
                                }
                                    {/* {
                                product.role?
                                (  
                                    product.ads?
                                    (<p>ad.</p>)
                                    :

                                    (<p>live</p>)
                                    ):
                                    (  
                                   !product.ads?
                                    (<p>req.</p>):
                                    (<p>d</p>)
                                    )
                            } */}
                                </Table.Cell>
                                <Table.Cell>
                                    <Table.Cell>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className='btn btn-xs bg-red-500'>Delete</button>
                                    </Table.Cell>
                                </Table.Cell>



                            </Table.Row>




                        </Table.Body>)
                    }
                </Table>
            </div>

        </div>
    );
};

export default MyAllProduct;