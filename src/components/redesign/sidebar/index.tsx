/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React from 'react';
import icon from '../svgs/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/stylish.module.css';
import { sideBarData } from '@//data';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '@//utils/firebaseConfig';

const SideBar = () => {
  return (
    <aside
      className={`lg:min-w-[200px] hidden lg:flex h-screen lg:py-[30px] lg:px-[13px] flex flex-col items-center bg-[#0B2533] lg:gap-[10px] shadow-md ${styles['slide-from-top']} shadow-2xl`}>
      <div className='w-full flex flex-col justify-between h-full items-center lg:gap-[20px] slide-from-right'>
        <div className='flex gap-[16px] justify-center items-center'>
          <Image
            src={icon}
            width={30}
            height={30}
            alt=''
            className='w-[30px] h-[30px]'
            // onClick={() => {
            //   window.location.reload();
            // }}
          />
          <h2 className='font-medium text-[30px] leading-[23px] text-center text-white'>
            Jarvis
          </h2>
        </div>

        <div className='w-full flex flex-col lg:gap-[16px] ml-10'>
          {/**links */}
          <div className='flex flex-col lg:gap-[26px]'>
            {sideBarData.map(
              (item: { name: string; url: string; icon: any }, idx: number) => (
                <div
                  onClick={() => {
                    if (item.name === 'Log out') {
                      return auth.signOut();
                    }
                  }}
                  key={idx}
                  className={`flex gap-[20px] ${
                    (auth.currentUser?.uid && item.name === 'Log in') ||
                    item.name === 'Sign up'
                      ? 'hidden'
                      : 'flex'
                  }`}>
                  <FontAwesomeIcon
                    width={20}
                    height={20}
                    className='w-[20px] h-[20px]'
                    icon={item.icon}
                    color='whitesmoke'
                  />
                  <Link
                    href={item.url}
                    title={item.name}
                    className='font-normal  link transition-all duration-500 text-white text-[20px] leading-[23px] text-center'>
                    {item.name}
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
