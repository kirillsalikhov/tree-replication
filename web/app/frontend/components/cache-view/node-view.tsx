import { classNames } from 'primereact/utils';
import React from 'react';
import { useRemoveMutation } from '@/api/use-remove-mutation';
import { useCreateMutation } from '@/api/use-create-mutation';
import { ItemBase } from '@/api/gen/api.schemas';

interface NodeViewProps {
  item: ItemBase;
  className: string;
}

export const NodeView = ({ item, className }: NodeViewProps) => {
  const removeMutation = useRemoveMutation();
  const { createDefault } = useCreateMutation();

  const removeClick = () => {
    removeMutation.mutate({ id: item.id });
  };

  const addClick = () => {
    createDefault(item.id);
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
