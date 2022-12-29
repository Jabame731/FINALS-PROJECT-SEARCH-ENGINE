import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

import aclc from '../utils/aclc.png';

const Home = () => {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center h-[500px]'>
        <div className='mb-1'>
          <img
            alt='ACLC-IT-ME3-logo'
            src={aclc}
            className='object-cover w-[400px] h-[200px]'
          />
        </div>

        <SearchBar />
        <div className='mt-6'></div>
      </div>
    </>
  );
};

export default Home;
