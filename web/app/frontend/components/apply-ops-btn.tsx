import { useQueryClient } from '@tanstack/react-query';
import { getItemsQueryKey, useApplyCache } from '@/api/api.gen';
import { Button } from 'primereact/button';
import React from 'react';

export const ApplyOpsBtn = () => {
  const queryClient = useQueryClient();
  const applyCacheMutation = useApplyCache({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: getItemsQueryKey() });
      },
    },
  });

  return (
    <Button
      size='small'
      raised
      loading={applyCacheMutation.isPending}
      label='Apply cache'
      onClick={() => applyCacheMutation.mutate()}
    />
  );
};
