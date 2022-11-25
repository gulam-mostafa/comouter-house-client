import { Button, Modal } from 'flowbite-react';
import { fromJSON } from 'postcss';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Components/Context/AuthProvider';

const OrderModal = ({ item, refetch }) => {
    const { name, img, area, Condition, _id, color, orginal_price, price, rating, createdAt, location, title, types, } = item
    const { user } = useContext(AuthContext)
    const myTimeout = setTimeout( 90000);
    const handleOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.title.value
        const createdDate = form.createdAt.value
        const img = form.img.value
        const displayName = form.displayName.value
        const id = form.id.value
        const email = form.email.value
        const price = form.price.value
        const photoURL = form.photoURL.value
        const types = form.types.value
        const location = form.location.value
        console.log(title, img, id, email)

        const order = {
            title, name, img, displayName, createdDate,
            price, photoURL, types, location, color, orginal_price,
            createdAt: new Date().toISOString(),
        }
        console.log(order)




        fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/orders`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                       alert('order success')
                    // toast("Order successful", {
                    //     position: toast.POSITION.TOP_CENTER,
                    //   });
                      if(myTimeout){
                        window.location.reload(setTimeout(9000));
                      }

                }
           
                else {
                    toast.error(data.message)
                }
            })

    }

  const  timer = () => {
        setTimeout(() => {
            window.location.reload(setTimeout(5000));
        }, 5000);
      }

    return (
        <div className=''>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="Add-modal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative mx-auto ">
                    <label htmlFor="Add-modal" className="btn btn-sm btn-circle absolute  right-2 top-2">✕</label>
                    <h3  className="text-lg text-center text-purple-600 font-bold w-10/12 mx-auto">{title}</h3>
                    <h3 className="text-lg font-bold w-10/12 text-center  mx-auto">Name: {user?.displayName}</h3>
                    <form
                        onSubmit={handleOrder}
                        className=' '>
                           
                        <input type="text" name='createdAt' disabled defaultValue={createdAt} className="input hidden input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        
                        <input type="text" name='types' disabled defaultValue={types} className="input input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='id' disabled defaultValue={_id} className="input hidden input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                       
                        <input type="text" name='photoURL' disabled defaultValue={user?.photoURL}  className="input hidden input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                       
                        <input type="text" name='price' disabled defaultValue={'$' + price} className="input input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='email' disabled defaultValue={user?.email} className="input input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='img' disabled defaultValue={img} className="input hidden input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='title' disabled defaultValue={title} className="input hidden input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='location' disabled defaultValue= {location}  className="input input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='area'  defaultValue= {area}  className="input input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='displayName' defaultValue={user?.uid? user.displayName : 'Type Your name' } className="input input-bordered input-primary w-full mb-1 mx-4 mt-1 " />
                        <input type="text" name='mobile' defaultValue={'+880 '} className="input input-bordered input-primary w-full mb-1 mx-4 mt-1 " />


                        <div className=' mx-auto modal-actio'>
                            <input 
                             onClick={timer}
                            type="submit" className='btn w-full mx-4 my-2 bg-black ' value='Book now' />
                        </div>

                    </form>



                </div>
            </div>
        </div>
    );
};

export default OrderModal;