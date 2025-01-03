/** @format */

'use client';
import { usePageContext } from '@//context/page-context';
import React from 'react';

const WelcomePage = () => {
  const { setIsLoginButtonClicked, setIsSignUpButtonClicked } =
    usePageContext();
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <h2 className='font-bold text-center text-3xl text-white'>
        Welcome, would you like to sign in or login?
      </h2>
      <div className='flex gap-4'>
        <button
          type='button'
          onClick={() => {
            setIsSignUpButtonClicked(true);
            setIsLoginButtonClicked(false);
            window.location.href = '/signup';
          }}
          className='py-1 px-2 border-2 border-gray-200 w-[100px] h-[50px] hover:bg-transparent hover:text-white transition-all duration-500 bg-white rounded-lg text-base hover:shadow-2xl hover:shadow-emerald-500'>
          Sign Up
        </button>
        <button
          type='button'
          onClick={() => {
            setIsSignUpButtonClicked(false);
            setIsLoginButtonClicked(true);
            window.location.href = '/login';
          }}
          className='py-1 px-2 border-2 border-gray-200 w-[100px] h-[50px] hover:bg-transparent hover:text-white transition-all duration-500 bg-white shadow-lg rounded-lg text-base hover:shadow-2xl hover:shadow-emerald-500'>
          Login
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
