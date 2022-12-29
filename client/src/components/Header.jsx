import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../redux/auth/authSlice';

import { toNormalStringFromKebabCase } from '../helper/helper';

import userImage from '../utils/relaxing.jpg';

const Header = ({ searchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className='lg:flex lg:items-center lg:justify-between h-[100px]  '>
      {searchTerm ? (
        <p className='ml-[100px]'>
          Search Results for:{' '}
          <span className='font-bold'>
            {toNormalStringFromKebabCase(searchTerm)}
          </span>
        </p>
      ) : (
        ''
      )}

      <div className='min-w-0 flex-1'></div>

      <div className='mt-5 flex lg:mt-0 lg:mr-[100px]'>
        <div className='flex items-center justify-evenly gap-6'>
          {user ? (
            <div className='flex items-center justify-evenly gap-6'>
              <p>Welcome {user.name}</p>
              <img
                src={userImage}
                alt=''
                className='rounded-full  w-[60px] h-[60px]'
              />
              <button onClick={onLogout}>
                <span className='text-xl'>
                  <FiLogOut />
                </span>
              </button>
            </div>
          ) : (
            <>
              <Link to='/login'>
                <span className='flex items-center justify-evenly gap-6 '>
                  Login
                </span>
              </Link>
              <Link to='/register'>
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
