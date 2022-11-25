import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Loading from "../Components/Loading";
import bg from './banner-computer.png'
import CategoryCard from "./CategoryCard";


const Home = ({ items }) => {
    const selectedItems = useLoaderData()
    const totalItems = selectedItems.length


    const [loading, setLoading] = useState(true)
    const [categorys, setCategory] = useState([]);
    // console.log(categorys)

    useEffect(() => {
        fetch('https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/category')
            .then(res => res.json())
            .then(data => {
                setCategory(data)
                setLoading(false)



            })
    }, [])

    if (loading) {
        <h1 className='text-center mt-32'><Loading></Loading></h1>
    }

    return (


        <div className="md:px-16 mx-3 m-auto min-h-screen my-8 bg-white"
            style={{ position: 'relative', zIndex: '2' }}
        >


            <div className="h-64 sm:h-96 26xl:h-full -z-1 rxl:h-5/6"       >
                <Carousel slideInterval={90000}>
                    <div>

                        <img className="-z-1"
                            src="https://i.ibb.co/RQGD7HP/computer-body.jpg"
                            alt="..." />
                    </div>
                    <img
                        src="https://i.ibb.co/9Hpjq2D/computer-coloer.jpg"
                        alt="..."
                    />
                    <img
                        src="https://i.ibb.co/4VVDJVS/computer-ram.jpg"
                        alt="..."
                    />
                    <img
                        src="https://i.ibb.co/DgvKk5n/desktop.jpg"
                        alt="..."
                    />
                    <img
                        src="https://i.ibb.co/VVbjGMr/motherboard.jpg"
                        alt="..."
                    />
                </Carousel>

            </div>
            {loading ?
                <h1 className='text-center w-11/12 mx-auto'><Loading></Loading></h1> :
                <h1></h1>}
            <div className="grid md:grid-cols-3 md:grid-cols-2 gap-4 ">

                {
                    categorys.map(category => <CategoryCard
                        category={category}
                        key={category._id}
                        loading={loading}
                        totalItems={totalItems}>
                    </CategoryCard>)

                }


            </div>

            <div
                className="h-11/1 min-h-scree my-4 md:py-4 lg:py-64 xl:py-7 sm:py-3 py-20  border  rounded-lg"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: "100%"
                }}

            >
                <h2 className="md:w-1/2 text-6xl ml-3 pt-40 text-center text-pink-600 ">Life Easy</h2>
                <p className="md:w-1/2 text-white md:text-2xl ml-3 py-12 pb-40 text-center  ">“It’s important to remember that trust is a matter of perception and something every business has to earn.”</p>

            </div>

        </div>
    );
};

export default Home;