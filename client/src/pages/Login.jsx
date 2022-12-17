import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { login, reset } from '../redux/auth/authSlice';
import Loading from '../components/Loading';

import image from '../utils/signin-image.jpg';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        transition: Slide,
        theme: 'colored',
      });
    }

    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex flex-row'>
      <div className='basis-full sm:basis-3/4'>
        <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
          <div className='max-w-lg mx-auto'>
            <form className='p-8 mt-6 mb-0 space-y-4 '>
              <h1 className='text-[30px] font-bold mt-5 mb-10 flex justify-center'>
                Signin to Your Account
              </h1>
              <div>
                <label className='text-sm font-medium'>Email</label>
                <div className='relative mt-1'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='relative block w-full appearance-none p-3  rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm  '
                    placeholder='Enter email'
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className='text-sm font-medium'>Password</label>
                <div className='relative mt-1'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='relative block w-full appearance-none p-3  rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Enter password'
                    value={password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type='submit'
                className='block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg mt-5 '
                onClick={handleLogin}
              >
                Sign in
              </button>

              <div className='flex justify-between'>
                <p className='text-xs sm:text-sm text-center text-gray-500 cursor-pointer'>
                  <span className='undeline'>Forgot password?</span>
                </p>
                <p className='text-xs sm:text-sm text-center text-gray-500'>
                  No account?
                  <Link to='/register'>
                    <span className='underline cursor'>Register Here</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class='basis-0 sm:basis-1/2'>
        <img
          src={image}
          alt=''
          className='hidden lg:block h-screen w-screen sm:hidden'
        />
      </div>
    </div>
  );
};

export default Login;
