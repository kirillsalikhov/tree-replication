import { getCachedItemsQueryKey, ItemBase, useUpdate } from '@/api/api.gen';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface NodeEditProps {
  item: ItemBase;
  onClose: () => void;
}

export const NodeEdit = ({ item, onClose }: NodeEditProps) => {
  const [value, setValue] = useState(item.value);
  const queryClient = useQueryClient();
  const updateMutation = useUpdate({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: getCachedItemsQueryKey() });
      },
    },
  });

  const save = () => {
    updateMutation.mutate({ id: item.id, data: { value: value } });
    onClose();
  };

  const cancel = () => onClose();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      save();
    } else if (e.key === 'Escape') {
      cancel();
    }
  };

  return (
    <div>
      <InputText
        autoFocus
        className='-ml-2 py-1'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button
        className='ml-2 h-9 w-9'
        icon='pi pi-check'
        severity='success'
        rounded
        text
        onClick={save}
      />
      <Button
        className='ml-2 h-8 w-8'
        icon='pi pi-times'
        severity='secondary'
        rounded
        text
        onClick={cancel}
      />
    </div>
  );
};
