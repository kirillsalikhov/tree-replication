import { useQueryClient } from '@tanstack/react-query';
import { useResetToPreset } from '@/api/api.gen';
import { SplitButton } from 'primereact/splitbutton';
import React from 'react';
import { useToast } from '@/providers/toast-provider';

export const ResetPresetBtn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const resetToPresetMutation = useResetToPreset({
    mutation: {
      onSuccess(data, variables) {
        queryClient.invalidateQueries();
        showToast({
          severity: 'secondary',
          summary: 'DB',
          detail: `DB set to preset: ${variables.data.name}`,
        });
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
