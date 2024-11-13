import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

import { Layout } from '@/components/layout';

export const App = () => {
  return (
    <div>
      <PrimeReactProvider value={{ unstyled: false, ripple: true }}>
        <Layout>App?</Layout>
      </PrimeReactProvider>
    </div>
  );
};
