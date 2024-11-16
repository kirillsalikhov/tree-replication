import { Button } from 'primereact/button';
import React from 'react';
import { useApplyCacheMutation } from '@/api/use-apply-cache-mutation';

export const ApplyOpsBtn = () => {
  const applyCacheMutation = useApplyCacheMutation();

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
