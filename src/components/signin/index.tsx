/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React from 'react';
import defaultUser from '@//assets/defaultUser.png';
import Image from 'next/image';
import * as Yup from 'yup';
import { useFormik } from 'formik';
//import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { signIn } from '@//auth/login/signin';

const Index = () => {
  const validateSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        await signIn(email, password);

        toast.success('Login successful.', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } catch (error: any) {
        console.error('Error signing up:', error);
      }
    },
  });

  return (
    <section className='w-full h-screen flex md:justify-center md:items-center slide-from-left md:px-0 bg-zinc-900 md:bg-transparent'>
      <div className='w-full md:w-[350px] md:h-[500px] pt-2 px-6 md:rounded-md slide-from-bottom shadow-xl bg-zinc-900 flex flex-col justify-between gap-1 pb-[30px]'>
        <div className='header bg-zinc-900 flex justify-center w-full h-[40px] rounded-md items-center px-2'>
          <h2 className='text-2xl text-white font-medium'>Jarvis</h2>
          <Image
            src={defaultUser}
            width={30}
            height={30}
            className='rounded-full ml-2'
            alt='Default User'
          />
        </div>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
          <label htmlFor='email' className='flex flex-col'>
            <span className='text-white text-lg font-medium'>Email</span>
            <input
              type='email'
              id='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='bg-zinc-800 outline-none border border-gray-700 rounded-md px-2 py-1 text-white'
              placeholder='Enter your email'
            />
            {formik.touched.email && formik.errors.email && (
              <span className='text-red-500 text-sm'>
                {formik.errors.email}
              </span>
            )}
          </label>

          <label htmlFor='password' className='flex flex-col'>
            <span className='text-white text-lg font-medium'>Password</span>
            <input
              type='password'
              id='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='bg-zinc-800 outline-none border border-gray-700 rounded-md px-2 py-1 text-white'
              placeholder='Enter your password'
            />
            {formik.touched.password && formik.errors.password && (
              <span className='text-red-500 text-sm'>
                {formik.errors.password}
              </span>
            )}
          </label>

          <button
            type='submit'
            className='bg-zinc-700 hover:bg-zinc-800 transition-all duration-500 text-white rounded-md py-2 mt-4'>
            Login
          </button>
        </form>
        <div className='h-[30px] rounded-md'></div>
      </div>
    </section>
  );
};

export default Index;
