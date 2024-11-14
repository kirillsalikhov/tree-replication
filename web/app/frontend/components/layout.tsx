import React from 'react';
import { DbView } from '@/components/db-view';
import { CacheView } from '@/components/cache-view';

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-4 gap-4 bg-violet-400 px-4 pt-12'>
        <div className='col-span-2 bg-green-200'>
          <CacheView />
        </div>
        <div className='col-span-2 bg-blue-200'>
          <DbView />
        </div>
        <div className='col-span-4'> {children}</div>
      </div>
    </div>
  );
};
