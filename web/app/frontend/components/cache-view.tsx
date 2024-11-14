import {
  Tree,
  TreeNodeDoubleClickEvent,
  TreeNodeTemplateOptions,
} from 'primereact/tree';
import React, { useState } from 'react';
import {
  getCachedItemsQueryKey,
  ItemBase,
  useCachedItems,
  useCreate,
  useRemove,
  useUpdate,
} from '@/api/api.gen';
import { buildTree } from '@/components/utils';
import { TreeNode } from 'primereact/treenode';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useQueryClient } from '@tanstack/react-query';
import { classNames } from 'primereact/utils';

export const CacheView = () => {
  const { data } = useCachedItems();
  const [editedId, setEditId] = useState<string | null>(null);

  if (!data) return <div className='p-4 text-center'>...Loading</div>;
  const cachedItems = data.data;

  const nodes = buildTree(cachedItems, (node, item) => {
    if (item.is_deleted) {
      node.className += ' bg-red-50';
    }
    return node;
  });

  const onDoubleClick = (evt: TreeNodeDoubleClickEvent) => {
    const item: ItemBase = evt.node.data;
    setEditId(item.id);
  };

  const onEditClose = () => {
    setEditId(null);
  };

  const nodeTemplate = (node: TreeNode, options: TreeNodeTemplateOptions) => {
    const item: ItemBase = node.data;
    if (item.id === editedId) {
      return <EditLabel item={item} onClose={onEditClose} />;
    }
    return <NodeLabel item={item} className={options.className} />;
  };

  return (
    <div>
      <Tree
        value={nodes}
        nodeTemplate={nodeTemplate}
        onNodeDoubleClick={onDoubleClick}
        className='md:w-30rem w-full'
      />
    </div>
  );
};

let counter = 1;
const newValue = () => `New node ${counter++}`;

interface NodeLabelProps {
  item: ItemBase;
  className: string;
}

const NodeLabel = ({ item, className }: NodeLabelProps) => {
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
      <span className='ml-2 text-red-400'>
        <i
          onClick={removeClick}
          className='pi pi-times invisible cursor-pointer group-hover:visible'
        ></i>
      </span>
      <span className='ml-2 text-blue-500'>
        <i
          onClick={addClick}
          className='pi pi-plus invisible cursor-pointer group-hover:visible'
        ></i>
      </span>
    </span>
  );
};

interface EditLabelProps {
  item: ItemBase;
  onClose: () => void;
}

const EditLabel = ({ item, onClose }: EditLabelProps) => {
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
