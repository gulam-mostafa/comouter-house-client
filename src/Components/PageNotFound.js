import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='min-h-screen text-center w-10/12 mt-10 lg:mx-32'>
            <p className='text-4xl text-red-700'> Page Not Found </p>
            <img className=' my-10  w-1/2 h-1/2 mx-auto' src="https://freefrontend.com/assets/img/html-css-404-page-templates/Simple-Pure-CSS3-404-Error-Page.gif" alt="" />
            <p>Visit <Link className='underline text-blue-600' to='/'>Home</Link></p>
            <Link to='/'><Button className='w-1/2 my-10 mx-auto'>Home</Button></Link>
        </div>
    );
};

export default PageNotFound;