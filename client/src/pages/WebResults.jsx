import React from 'react';

import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';

import { useGetWebSearchQuery } from '../redux/web-searchAPI/webSearchEngine';

import { capitalizeFirstLetterEveryWord, toKebabCase } from '../helper/helper';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const WebResults = () => {
  const { searchTerm } = useParams();

  const { data, isFetching, error } = useGetWebSearchQuery(searchTerm);

  if (isFetching) return <Loading />;

  console.log(error);

  const RenDerCorrectSpelling = () => {
    const correctSpelling = capitalizeFirstLetterEveryWord(data.didUMean);
    const forParams = toKebabCase(correctSpelling); //for kebabcasing parameters
    return (
      <>
        Did You Mean?
        <span className='font-bold cursor-pointer italic hover:underline underline-offset-2 text-gray-700'>
          <Link to={`/web-search/${forParams}`}>{correctSpelling}</Link>
        </span>
      </>
    );
  };

  return (
    <>
      <Header searchTerm={searchTerm} />
      <div className='ml-[100px]'>
        <span className='text-3xl'>Web Results</span>

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

        <div className='mx-auto w-full  '>
          <p className='text-gray-500 text-md mb-5 mt-3 '>
            About {data.totalCount} results
          </p>
          <p className='mb-5 mt-3'>
            {data.didUMean ? <RenDerCorrectSpelling /> : ''}
          </p>

          {data.value?.map((result) => (
            <div key={result.url} className='max-w-xl mb-8 font-sans'>
              <div className='group'>
                <a href={result.url} className='text-sml  text-stone-700'>
                  {result.url}
                </a>
                <a href={result.url}>
                  <h2
                    className='truncate 
           text-xl text-blue-700 group-hover:underline '
                  >
                    {result.title}
                  </h2>
                </a>
              </div>
              <p className='line-clamp-2 text-gray-900 '>
                {result.description}
              </p>
              <>
                {result.image.url ? (
                  <div className='flex justify-end absolute top-100 mt-[-75px] right-0 mr-[600px] '>
                    <img
                      src={result.image.url}
                      alt={result.image.provider.name}
                      width='100'
                      height='100'
                    />
                  </div>
                ) : (
                  ''
                )}
              </>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default WebResults;
