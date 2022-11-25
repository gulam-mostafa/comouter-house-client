
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import AllsellerCard from './AllsellerCard';
import { useQuery } from '@tanstack/react-query';



const AllSeller = () => {
    const sellerUsers = useLoaderData()
    // const allSellers = sellerUsers[0].account
    // console.log(sellerUsers[0])
   
  
    const {data: users = [] , refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async() =>{
            const res = await fetch(`http://192.168.1.103:5000/users?account=seller`);
            const data = await res.json();
          
          
            return data;    }
    })


    const handleMakeSeller = id => {
        fetch(`http://192.168.1.103:5000/users/sale/${id}`, {
            method: "PUT",
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)
           if(data.modifiedCount > 0){
            toast("Verified successful", {
                position: toast.POSITION.TOP_CENTER,
              });
           refetch()
         
        }
       
      
            })
    }

    return (
        <div className=''>
            <p className='text-center text-3xl my-5'>Total Sellers {users.length}</p>

            <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:grid-cols-2 mx-auto place-items-center'>
                {
                    users.map(seller => <AllsellerCard key={seller._id}
                        seller={seller}
                        
                        handleMakeSeller={handleMakeSeller}
                    >


                    </AllsellerCard>)
                }

            </div>
        </div>
    );
};

export default AllSeller;