import { useQueryClient } from '@tanstack/react-query';
import { getCachedItemsQueryKey, useResetCache } from '@/api/api.gen';
import { Button } from 'primereact/button';
import React from 'react';
import { useToast } from '@/providers/toast-provider';

export const ResetCacheBtn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const resetCacheMutation = useResetCache({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: getCachedItemsQueryKey() });
        showToast({
          severity: 'secondary',
          summary: 'Cache',
          detail: 'Cache was reset',
        });
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
