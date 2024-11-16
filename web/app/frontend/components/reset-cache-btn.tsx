import { Button } from 'primereact/button';
import React from 'react';
import { useResetCacheMutation } from '@/api/use-reset-cache-mutation';

export const ResetCacheBtn = () => {
  const resetCacheMutation = useResetCacheMutation();

  const onClick = () => resetCacheMutation.mutate();

  return (
    <Button
      size='small'
      raised
      loading={resetCacheMutation.isPending}
      label='Reset Cache'
      severity='secondary'
      onClick={onClick}
    />
  );
};
