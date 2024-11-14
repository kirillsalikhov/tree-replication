import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

import { Layout } from '@/components/layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App = () => {
  // TODO set defaults, especially retry, stale ...
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <div>
      <PrimeReactProvider value={{ unstyled: false, ripple: true }}>
        <QueryClientProvider client={queryClient}>
          <Layout>App?</Layout>
        </QueryClientProvider>
      </PrimeReactProvider>
    </div>
  );
};
