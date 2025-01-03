/** @format */

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

interface HistoryCardProps {
  heading: string;
}

const HistoryCard: FC<HistoryCardProps> = ({ heading }) => {
  return (
    <div className='h-[101px] w-full flex gap-[32px] justify-between items-center'>
      <h2 className='text-lg text-white'>{heading}</h2>
      <FontAwesomeIcon
        width={20}
        height={20}
        color='gray'
        className='cursor-pointer'
        icon={faEllipsis}
      />
    </div>
  );
};

export default HistoryCard;
