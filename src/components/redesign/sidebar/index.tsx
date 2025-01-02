/** @format */

import React from 'react';
import icon from '../svgs/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/stylish.module.css';
import { sideBarData } from '@//data';
import './styles.css';

const SideBar = () => {
  return (
    <aside className='lg:min-w-[200px] flex-grow-1 h-screen border-r-[1px] lg:py-[30px] lg:px-[13px] flex flex-col items-center bg-[#0B2533] lg:gap-[10px] border-[#FFFFFF4D] shadow-md slide-from-left'>
      <div className='w-full flex flex-col items-center lg:gap-[20px] slide-from-right'>
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
        <div className='w-full flex flex-col lg:gap-[16px]'>
          <h2 className='font-medium text-[30px] leading-[23px] text-center text-white'>
            Jarvis
          </h2>
          {/**links */}
          <div className='flex flex-col lg:gap-[16px] mt-6'>
            {sideBarData.map(
              (item: { name: string; url: string }, idx: number) => (
                <Link
                  key={idx}
                  href={item.url}
                  title={item.name}
                  className='font-normal  link transition-all duration-500 text-white text-[20px] leading-[23px] text-center'>
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
