import React from 'react';

import Header from '../components/Header';

import aclc from '../utils/aclc.png';

const Home = () => {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center h-[500px]'>
        <div className='mb-6'>
          <img
            alt='ACLC-IT-ME3-logo'
            src={aclc}
            className='object-cover w-[400px] h-[200px]'
          />
        </div>
        <div className='flex items-center w-full mx-auto mb-4 border rounded-full lg:max-w-2xl hover:shadow-md'>
          <div className='pl-5'></div>
          <input
            type='text'
            className='w-full bg-transparent rounded-full py-[14px] pl-4 outline-none'
          />
          <div className='pr-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              stroke-width='2'
            >
              <path
                stroke-linecap='round'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>
        <div className='flex gap-x-6'>
          <button className='px-3 py-2 text-base font-light cursor-pointer hover:shadow bg-gray-50'>
            ITME3 Search
          </button>
          <button className='px-3 py-2 text-base font-light cursor-pointer hover:shadow bg-gray-50'>
            I'm Feeling Lucky
          </button>
        </div>
        <div className='mt-6'></div>
      </div>
    </>
  );
};

export default Home;
