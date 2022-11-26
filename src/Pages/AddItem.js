import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/Context/AuthProvider';

const AddItem = () => {
    const { logout, updateUserProfile, providerLogin, createUser } =
        useContext(AuthContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();




    const handleAddItem = (event) => {
        event.preventDefault()
        const form = event.target;
        const title = form.title.value;
        const price = form.price.value;
        const rating = form.rating.value;
        const description = form.description.value;
        const color = form.color.value;
        const location = form.location.value;
        const condition = form.condition.value;
        const orginal_price = form.orginal_price.value;
        const total = form.total.value;
        const mobile = form.mobile.value;
        const types = form.types.value;
        const image = form.img.files[0]
        setLoading(true)
        console.log(types, image, title, description, color, mobile, location, condition, orginal_price, total, rating, price,)

        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=2d5b1a5401d8ef6742d2329ac8957810`
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
        
           




    }


    return (
        <div>
            <div className='w-10/12 text-yellow-300 text-3xl font-bold m-auto text-center'><h1>Add a Item very carefully</h1></div>
            <form onSubmit={handleAddItem} className="flex lg:w-10/12 m-auto flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="title"
                            value="Item Title"
                        />
                    </div>
                    <TextInput
                        id="title"
                        name='title'
                        type="text"
                        placeholder=" type item name "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="price"
                            value="Item Price"
                        />
                    </div>
                    <TextInput
                        id="price"
                        type="text"
                        name='price '
                        placeholder="type current Price "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="rating"
                            value="Item Rating"
                        />
                    </div>
                    <TextInput
                        id=" rating"
                        type="text"
                        name='rating'
                        placeholder="Type   Item Rating "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="description"
                            value="Item description"
                        />
                    </div>
                    <TextInput
                        id=" description"
                        type="text"
                        name='description'
                        placeholder="Item description "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="color"
                            value="Item color"
                        />
                    </div>
                    <TextInput
                        name="color"
                        type="text"
                        placeholder="Item Color "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="location"
                            value="Your location"
                        />
                    </div>
                    <TextInput
                        name="location"
                        type="text"
                        placeholder="Type item Location "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="condition"
                            value="Item condition"
                        />
                    </div>
                    <TextInput
                        name="condition"
                        type="text"
                        placeholder="item condition    "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="orginal_price"
                            value="Item original price"
                        />
                    </div>
                    <TextInput
                        name="orginal_price"
                        type="text"
                        placeholder="Type original Price "
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="total"
                            value=" Total Item "
                        />
                    </div>
                    <TextInput
                        name="total"
                        type="text"
                        placeholder='Total items'
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="Mobile"
                            value="Mobile Number"
                        />
                    </div>
                    <TextInput
                        name='mobile'
                        type="text"
                        placeholder='type Your Mobile Number'
                        required={true}
                        shadow={true}
                    />
                </div>
                <div>
                    <select name='types' className="select select-primary w-full max-w-xs">
                        <option disabled selected>Select a Category</option>
                        <option defaultValue={'Gaming_pc'}>Gaming_pc</option>
                        <option defaultValue={'Brand_pc'}>Brand_pc</option>
                        <option defaultValue={'Official_pc'}>Official_pc</option>
                        <option defaultValue={'Mini_pc'}>Mini_pc</option>
                    </select>
                </div>
                <div>
                    <input required type="file" name='img' className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
                </div>

                <Button type="submit">
                    Add product
                </Button>
            </form>
        </div>
    );
};

export default AddItem;