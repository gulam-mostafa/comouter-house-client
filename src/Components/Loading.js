import { Spinner } from 'flowbite-react';
import React from 'react';

const Loading = () => {
    return (
        <div className='text-center flex justify-center '>
              <Spinner
    color="pink"
    aria-label="Pink spinner example"
  />
        </div>
    );
};

export default Loading;