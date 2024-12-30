/** @format */

import React from 'react';
import LoadingBalls from './loading';

const LoadingPage = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <span className='text-white flex items-center'>
        <span className='text-lg'>Jarvis</span> <LoadingBalls />
      </span>
    </div>
  );
};

export default LoadingPage;
