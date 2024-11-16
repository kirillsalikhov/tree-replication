import { useQueryClient } from '@tanstack/react-query';
import { getCachedItemsQueryKey, useResetCache } from '@/api/api.gen';
import { Button } from 'primereact/button';
import React from 'react';

export const ResetCacheBtn = () => {
  const queryClient = useQueryClient();
  const resetCacheMutation = useResetCache({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: getCachedItemsQueryKey() });
      },
    },
  });

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
