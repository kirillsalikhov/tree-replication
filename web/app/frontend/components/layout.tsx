import React from 'react';
import { DbView } from '@/components/db-view';
import { CacheView } from '@/components/cache-view';

export const Layout = () => {
  return (
    <div className='container mx-auto'>
      <div className='grid min-h-80 grid-cols-1 gap-4 px-4 pt-12 md:grid-cols-2'>
        <div className='min-h-64'>
          <CacheView />
        </div>
        <div className='min-h-64'>
          <DbView />
        </div>
      </div>
    </div>
  );
};
