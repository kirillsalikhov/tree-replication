import { useQueryClient } from '@tanstack/react-query';
import { useResetToPreset } from '@/api/api.gen';
import { SplitButton } from 'primereact/splitbutton';
import React from 'react';

export const ResetPresetBtn = () => {
  const queryClient = useQueryClient();
  const resetToPresetMutation = useResetToPreset({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries();
      },
    },
  });

  const setPreset = (name = '4-level') => {
    resetToPresetMutation.mutate({ data: { name } });
  };

  const list = [
    {
      label: '4-level',
      command: () => setPreset('4-level'),
    },
    {
      label: 'Basic',
      command: () => setPreset('basic'),
    },
    {
      label: 'Root only',
      command: () => setPreset('root-only'),
    },
  ];

  return (
    <SplitButton
      label='Reset'
      size='small'
      raised
      loading={resetToPresetMutation.isPending}
      onClick={() => setPreset()}
      model={list}
    />
  );
};
