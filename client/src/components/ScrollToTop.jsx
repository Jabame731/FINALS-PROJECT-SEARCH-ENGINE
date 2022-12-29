import React from 'react';

import { RiArrowUpSLine } from 'react-icons/ri';

const ScrollToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className='fixed text-2xl bottom-[50px] right-5 bg-white border-none outline-none cursor-pointer p-2 rounded-md first-letter:
            shadow-lg
            '
      >
        <RiArrowUpSLine />
      </button>
    </>
  );
};

export default ScrollToTop;
