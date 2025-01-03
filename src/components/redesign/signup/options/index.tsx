/** @format */

import Image from 'next/image';
import React, { FC } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */

interface CardOptionProps {
  icon: any;
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const CardOption: FC<CardOptionProps> = ({
  icon,
  text,
  isDisabled,
  onClick,
}) => {
  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      className='w-full h-[45px] rounded-md border-[1.5px] py-[12px] px-[16px] border-[#F5F5F5] flex items-center justify-center'>
      <div className='flex gap-[4px]'>
        <Image
          src={icon}
          width={20}
          height={20}
          className='w-[20px] h-[20px]'
          alt=''
        />
        <span className='text-sm text-[#0B2533]'>{text}</span>
      </div>
    </div>
  );
};

export default CardOption;
