/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React from 'react';
import styles from '@//styles/stylish.module.css';
import Image from 'next/image';
import icon from '@//svgs/icon.svg';
import Link from 'next/link';
import CardOption from '../signup/options/index';
import { data } from '../signup/data/index';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { signIn } from '@//auth/login/signin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const validateSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      // const userExists = await checkCredentialsBeforeSignIn(
      //   values.email,
      //   values.password
      // );
      try {
        const { email, password } = values;
        const user = await signIn(email, password);

        if (user) {
          toast.success('Login successful.', {
            style: {
              background: '#333',
              color: '#fff',
            },
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          toast.error('Invalid credentials.', {
            style: {
              background: '#333',
              color: '#fff',
            },
          });
        }
      } catch (error: any) {
        toast.error(error, {
          style: {
            background: '#333',
            color: 'maroon',
          },
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        console.error('Error signing up:', error);
      }
      // if (userExists === false) {
      //   toast.error('User does not exist.', {
      //     style: {
      //       background: 'maroon',
      //       color: 'white',
      //     },
      //   });
      //   return;
      // } else {

      // }
    },
  });
  return (
    <section className='flex items-center justify-center w-full h-screen bg-transparent overflow-hidden'>
      <form
        action=''
        method='post'
        onSubmit={formik.handleSubmit}
        className={`md:w-[380px] w-full md:min-h-[480.61px] rounded-[10.33px] py-[20px] px-[35px] gap-[8px] flex-col flex bg-white ${styles['slide-from-bottom']} items-center justify-center`}>
        <div className='min-h-[190px] w-full flex flex-col gap-[20px]'>
          <div className='flex flex-col h-[74px] gap-[28px] justify-center items-center'>
            <Image
              src={icon}
              width={28}
              height={28}
              alt=''
              className='w-[32px] h-[32px]'
            />
            <h2 className='font-medium text-2xl leading-[20px] text-[#0B2533]'>
              Nice to have you back
            </h2>
          </div>

          <span className='text-sm text-center text-[#0B2533]'>
            Please, put in the necessary to get you started.
          </span>

          <label htmlFor='email' className='flex flex-col gap-1'>
            <input
              type='email'
              name='email'
              id='email'
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='h-[46px] w-full outline-none border-[1px] border-[#0B2533] rounded-md py-[13px] px-[17px]'
              placeholder='Email Address'
            />
            {formik.touched.email && formik.errors.email && (
              <span className='text-red-500 text-sm'>
                {formik.errors.email}
              </span>
            )}
          </label>

          <label htmlFor='password' className='flex flex-col gap-1'>
            <input
              type='password'
              name='password'
              id='password'
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='h-[46px] w-full outline-none border-[1px] border-[#0B2533] rounded-md py-[13px] px-[17px]'
              placeholder='**********'
            />
            {formik.touched.password && formik.errors.password && (
              <span className='text-red-500 text-sm'>
                {formik.errors.password}
              </span>
            )}
          </label>

          <button
            type='submit'
            className='h-[40px] rounded-md border-[1px] py-[8px] px-[16px] bg-[#0B2533] border-[#0B2533] text-white hover:shadow-2xl hover:shadow-[#25363f] transition duration-500 gap-2 flex items-center justify-center'>
            <span>Login</span>
            <FontAwesomeIcon width={20} height={20} icon={faRocketchat} />
          </button>

          <span className='text-sm font-normal text-center text-[#0B2533]'>
            Already have an account?{' '}
            <Link className='font-medium' href='/login'>
              Log in
            </Link>
          </span>

          <div className='flex items-center justify-center gap-[20px]'>
            <hr className='border w-1/2' />
            <span className='text-[#0B2533] text-sm'>OR</span>
            <hr className='border w-1/2' />
          </div>
        </div>

        <div className='flex flex-col w-full gap-2'>
          {data.map((item: { text: string; icon: any }, idx: number) => (
            <CardOption key={idx} {...item} />
          ))}
        </div>
      </form>
    </section>
  );
};

export default Login;
