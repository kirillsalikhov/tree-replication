import { useQueryClient } from '@tanstack/react-query';
import { getItemsQueryKey, useApplyCache } from '@/api/api.gen';
import { Button } from 'primereact/button';
import React from 'react';
import { useToast } from '@/providers/toast-provider';

export const ApplyOpsBtn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const applyCacheMutation = useApplyCache({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: getItemsQueryKey() });

        showToast({
          severity: 'success',
          summary: 'Success',
          detail: 'Cache applied to DB',
        });
      },
    },
  });

  return (
    <>
      <Button
        size='small'
        raised
        loading={applyCacheMutation.isPending}
        label='Apply cache'
        onClick={() => applyCacheMutation.mutate()}
      />
    </>
  );
};
