/** @format */

import Image from 'next/image';
import React from 'react';
import addIcon from './svgs/addIcon.svg';
import HistoryCard from './historycard';
import styles from '@//styles/stylish.module.css';

const History = () => {
  return (
    <aside
      className={`lg:min-w-[403px] lg:flex hidden flex-grow-2 h-screen px-[25px] flex-col lg:gap-[27px] bg-[#091e29] shadow-md ${styles['slide-from-bottom']}`}>
      <div className='h-[60px] border-b-[4px] flex justify-between items-center p-[10px] border-[#0B2533] w-full'>
        <h2 className='font-medium text-[20px] leading-[23px] text-[#FFFFFF]'>
          History
        </h2>
        <div className='w-[40px] h-[40px] rounded-full bg-[#0B2533] flex items-center cursor-pointer justify-center'>
          <Image
            src={addIcon}
            alt=''
            width={28}
            height={28}
            className='w-[24px] h-[24px]'
          />
        </div>
      </div>

      {/**second div */}
      <div className='w-full overflow-y-hidden scrollbar-hide flex flex-col gap-[37px] border-gray-400'>
        <input
          type='search'
          name=''
          id=''
          placeholder='Search History'
          className='rounded-[16px] outline-none text-white p-[20px] bg-[#0B2533]'
        />

        {/**histories */}
        <div className='w-full h-full overflow-y-scroll scrollbar-hide'>
          {Array.from({ length: 10 }).map((__, idx: number) => (
            <HistoryCard key={idx} heading='Sample' />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default History;
