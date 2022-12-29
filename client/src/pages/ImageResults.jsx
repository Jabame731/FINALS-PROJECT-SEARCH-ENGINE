import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import Header from '../components/Header';

import { useGetImageSearchQuery } from '../redux/web-searchAPI/webSearchEngine';

import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';

const ImageResults = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { searchTerm } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data, isFetching, error } = useGetImageSearchQuery(searchTerm);

  if (isFetching) return <Loading />;

  console.log(error);

  return (
    <>
      <Header searchTerm={searchTerm} />
      <div className='ml-[100px] lg:mr-[100px]'>
        <span className='text-3xl'>Image Results</span>

        <div className='w-[200px] '>
          <p className='text-md mb-5 mt-3'>
            Search Again?{' '}
            <Link to='/'>
              <span className='hover:text-blue-600 cursor-pointer'>
                Click Here
              </span>
            </Link>
          </p>
        </div>

        <p className='text-gray-500 text-md mb-5 mt-3 '>
          About {data.totalCount} results
        </p>

        <section className='columns-7  space-y-4'>
          {data.value?.map((result) => (
            <>
              <div
                className='rounded-md overflow-hidden cursor-pointer'
                key={result.url}
              >
                <a href={result.url} target='_blank' rel='noopener noreferrer'>
                  <img
                    src={result.url}
                    alt={result.title ? result.title : ''}
                  />
                </a>
              </div>
            </>
          ))}
        </section>
      </div>
      {scrollPosition > 200 && <ScrollToTop />}
      <Footer />
    </>
  );
};

export default ImageResults;
