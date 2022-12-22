import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Slide, toast } from 'react-toastify';

import { register, reset } from '../redux/auth/authSlice';

import Loading from '../components/Loading';

const Register = () => {
  const [registerData, setRegisteredData] = useState({
    email: '',
    name: '',
    password: '',
    cpassword: '',
    image: '',
  });

  const { email, name, password, cpassword, image } = registerData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        transition: Slide,
        theme: 'colored',
      });
    }

    if (isSuccess) {
      toast.success('You are Registered!');
      navigate('/login');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setRegisteredData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error('Password do not Match');
    } else {
      const userData = {
        email,
        name,
        password,
        image,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
        <div className='max-w-lg mx-auto'>
          <form className='p-8 mt-6 mb-0 space-y-4 '>
            <h1 className='text-[30px] font-bold mt-5 mb-10 flex justify-center'>
              Register Here
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
              <label className='text-sm font-medium'>Name</label>
              <div className='relative mt-1'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='relative block w-full appearance-none p-3  rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm  '
                  placeholder='Enter name'
                  value={name}
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
            <div>
              <label className='text-sm font-medium'>Confirm Password</label>
              <div className='relative mt-1'>
                <input
                  type='password'
                  id='cpassword'
                  name='cpassword'
                  className='relative block w-full appearance-none p-3  rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  placeholder='Confirm password'
                  value={cpassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className='text-sm font-medium'>Upload Image</label>
              <div className='relative mt-1'>
                <input
                  type='file'
                  id='image'
                  name='image'
                  value={image}
                  onChange={handleChange}
                  className='relative block w-full appearance-none p-3  rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <button
              type='submit'
              className='block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg mt-5 '
              onClick={handleRegister}
            >
              Register
            </button>

            <div className='flex justify-between'>
              <p className='text-xs sm:text-sm text-center text-gray-500 cursor-pointer'>
                <span className='undeline'>Already Have an account?</span>
                <Link to='/login'>
                  <span className='underline cursor'>Login Here</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
