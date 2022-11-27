import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Components/Context/AuthProvider';

const MyAllProduct = () => {
    const { user } = useContext(AuthContext)


    const { data: allProducts = [], refetch } = useQuery({
        queryKey: ['allProducts'],

        queryFn: async () => {
            const res = await fetch(`http://192.168.1.103:5000/myallproducts?email=${user.email}`);
            const data = await res.json();

            return data;
        }
    })

    const handleAdvertise = id => {
        fetch(`http://192.168.1.103:5000/items/ad/${id}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast("Your product is live", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    refetch()
                }
                
            })
          
    };



    return (
        <div>

            <p className='text-center text-blue-red-500 text-3xl py-4 underline'>My all items {allProducts.length} </p>
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
                                    {product.createdAt.slice(0, -14)}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.types}
                                </Table.Cell>
                                <Table.Cell>
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
                                  {
                                    product.ads ==='ads' ?(
                                        <p>Live</p>
                                    ):
                                    <button

                                    onClick={() => handleAdvertise(product._id)}
                                    className=" text-blue-600 hover:underline btn lg:btn-xs   text-white"
                                >
                                    Ads.
                                </button>
                                  }
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