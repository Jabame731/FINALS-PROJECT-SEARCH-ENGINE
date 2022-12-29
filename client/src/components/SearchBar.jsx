import React from 'react';
import { useState } from 'react';

import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { toKebabCase } from '../helper/helper';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleSubmitNews = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/news-search/${searchTerm}`);
    }

    setSearchTerm('');
  };

  const handleSubmitWeb = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/web-search/${searchTerm}`);
    }

    setSearchTerm('');
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/image-search/${searchTerm}`);
    }

    setSearchTerm('');
  };

  return (
    <>
      <div
        action=''
        className='flex items-center w-full mx-auto mb-4 border rounded-full lg:max-w-2xl hover:shadow-md'
      >
        <div className='pl-5'></div>
        <input
          type='text'
          className='w-full bg-transparent rounded-full py-[14px] pl-4 outline-none'
          onChange={(e) => setSearchTerm(toKebabCase(e.target.value))}
        />
        <div className='pr-5'>
          <BsSearch />
        </div>
      </div>
      <div className='flex'>
        <button
          className='bg-blue-100 text-blue-800  font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 hover:bg-sky-200'
          onClick={handleSubmitWeb}
        >
          Web Search
        </button>
        <button
          className='bg-green-100 text-green-800 font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 hover:bg-green-200'
          onClick={handleSubmitImage}
        >
          Image Search
        </button>
        <button
          className='bg-yellow-100 text-yellow-800 font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900 hover:bg-yellow-200'
          onClick={handleSubmitNews}
        >
          News Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
