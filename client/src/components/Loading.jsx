import React from 'react';
import spinner from '../utils/spinner.gif';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-[300px]'>
      <img src={spinner} alt='spinner' />
    </div>
  );
};

export default Loading;
