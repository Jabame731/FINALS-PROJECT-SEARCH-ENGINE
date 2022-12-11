import React from 'react';

import userImage from '../utils/imagenalami.jpg';

const Header = () => {
  return (
    <div className='lg:flex lg:items-center lg:justify-between h-[100px]'>
      <div className='min-w-0 flex-1'></div>
      <div className='mt-5 flex lg:mt-0 lg:mr-[100px]'>
        <div className='flex items-center justify-evenly gap-6'>
          <p>
            <span className='text-gray-500'> Welcome </span>{' '}
            <span className='text-[#5e3e33]'>Bottiveew</span>
          </p>

          <div className='flex items-center justify-evenly gap-6 '>
            <img
              src={userImage}
              alt=''
              className='rounded-full mr-[100px] w-[60px] h-[60px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
