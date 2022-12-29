import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import Header from '../components/Header';

import { useGetNewsSearchQuery } from '../redux/web-searchAPI/webSearchEngine';
import {
  shortenString,
  capitalizeFirstLetterEveryWord,
  toKebabCase,
} from '../helper/helper';

import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';

const NewsResults = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { searchTerm } = useParams();

  const { data, isFetching, error } = useGetNewsSearchQuery(searchTerm);

  if (isFetching) return <Loading />;

  console.log(error);
  console.log(data.didUMean);

  const RenDerCorrectSpelling = () => {
    const correctSpelling = capitalizeFirstLetterEveryWord(data.didUMean);
    const forParams = toKebabCase(correctSpelling); //for kebabcasing parameters
    return (
      <>
        Did You Mean?{' '}
        <span className='font-bold cursor-pointer italic hover:underline underline-offset-2 text-gray-700'>
          <Link to={`/news-search/${forParams}`}>{correctSpelling}</Link>
        </span>
      </>
    );
  };

  return (
    <>
      <Header searchTerm={searchTerm} />
      <div className='w-[200px] ml-[100px] '>
        <p className='text-md mb-5 mt-3'>
          Search Again?{' '}
          <Link to='/'>
            <span className='hover:text-blue-600 cursor-pointer'>
              Click Here
            </span>
          </Link>
        </p>
      </div>
      <p className='mb-5 mt-3  ml-[100px]'>
        {data.didUMean ? <RenDerCorrectSpelling /> : ''}
      </p>
      <div className='container mb-[50px] px-6 mx-auto'>
        <section className='mb-32 text-gray-800 text-center md:text-left'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Latest News</h2>
          <div className='flex content-center flex-wrap justify-center '>
            {data.value?.map((result) => (
              <div
                className='max-w-sm rounded overflow-hidden shadow-lg flex w-1/3 m-10'
                key={result.id}
              >
                <div>
                  <a
                    href={`${result.url}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      className='w-full'
                      src={result.image.url}
                      alt='sunset in the mountains'
                    />
                  </a>
                  <div className='px-6 py-4'>
                    <div className='font bold text-xl mb-2'>{result.title}</div>
                    <div className='text-gray-500 text-sm mb-2'>
                      {result.provider.name}
                    </div>
                    <p className='text-gray-700 text-base'>
                      {shortenString(result.body, 150)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {scrollPosition > 200 && <ScrollToTop />}
      <Footer />
    </>
  );
};

export default NewsResults;
