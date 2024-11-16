import {
  getCachedItemsQueryKey,
  ItemBase,
  useCreate,
  useRemove,
} from '@/api/api.gen';
import { useQueryClient } from '@tanstack/react-query';
import { classNames } from 'primereact/utils';
import React from 'react';

let counter = 1;
const newValue = () => `New node ${counter++}`;

interface NodeViewProps {
  item: ItemBase;
  className: string;
}

export const NodeView = ({ item, className }: NodeViewProps) => {
  const queryClient = useQueryClient();
  const removeMutation = useRemove({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: getCachedItemsQueryKey() });
      },
    },
  });

  const createMutation = useCreate({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: getCachedItemsQueryKey() });
      },
    },
  });

  const removeClick = () => {
    removeMutation.mutate({ id: item.id });
  };

  const addClick = () => {
    createMutation.mutate({
      data: { parent_id: item.id, value: newValue() },
    });
  };

  return (
    <span className={classNames(className, 'group pr-6')}>
      <b>{item.value} </b>
      {item.is_deleted && <span className='text-red-600'>(deleted)</span>}
      <span className='ml-2'>
        <i
          onClick={addClick}
          className='pi pi-plus invisible cursor-pointer group-hover:visible'
        ></i>
      </span>
      <span className='ml-2 text-red-400'>
        <i
          onClick={removeClick}
          className='pi pi-times invisible cursor-pointer group-hover:visible'
        ></i>
      </span>
    </span>
  );
};
