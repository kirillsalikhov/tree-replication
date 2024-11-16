import { SplitButton } from 'primereact/splitbutton';
import React from 'react';
import { useResetToPresetMutation } from '@/api/use-reset-to-preset-mutation';

export const ResetPresetBtn = () => {
  const resetToPresetMutation = useResetToPresetMutation();

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
