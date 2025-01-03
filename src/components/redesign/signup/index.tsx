/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React from 'react';
//import Image from 'next/image';
import icon from '@//svgs/icon.svg';
import Link from 'next/link';
import CardOption from './options';
import { data } from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faRocket } from '@fortawesome/free-solid-svg-icons';
//import defaultUser from '@//assets/defaultUser.png';
import Image from 'next/image';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { signUp } from '@//auth/signup/signup';
import { sendEmailVerification } from 'firebase/auth';
import toast from 'react-hot-toast';
import { initializeUserData } from '@//utils/initializeUserData';
import styles from '@//styles/stylish.module.css';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {
  const validateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
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
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const user = await signUp(email, password);

        if (user) {
          await sendEmailVerification(user);
          console.log('Verification email sent.');
          // Initialize user data in Firestore
          await initializeUserData(user, formik.values.name);
          //toast
          toast.success('Verification email sent.', {
            style: {
              background: '#333',
              color: '#fff',
            },
          });
          //navigate to login
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
        } else {
          //toast
          toast.error('Email already in use', {
            style: {
              background: '#333',
              color: '#fff',
            },
          });
        }
      } catch (error: any) {
        console.error('Error signing up:', error);
        //toast
        toast.error(error, {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
      }
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
              Welcome
            </h2>
          </div>

          <span className='text-sm text-center text-[#0B2533]'>
            Please, put in the necessary to get you started
          </span>

          <label htmlFor='name' className='flex flex-col gap-1'>
            <input
              type='name'
              name='name'
              id='name'
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='h-[46px] w-full outline-none border-[1px] border-[#0B2533] rounded-md py-[13px] px-[17px]'
              placeholder='Username'
            />
            {formik.touched.name && formik.errors.name && (
              <span className='text-red-500 text-sm'>{formik.errors.name}</span>
            )}
          </label>

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
            <span>Sign Up</span>
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

export default SignUp;
