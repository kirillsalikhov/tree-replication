import React from 'react';
import {
  Tree,
  TreeNodeDoubleClickEvent,
  TreeNodeTemplateOptions,
} from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import {
  getCachedItemsQueryKey,
  getItemsQueryKey,
  ItemBase,
  useApplyCache,
  useItems,
  useLoad,
} from '@/api/api.gen';
import { buildTree } from '@/components/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'primereact/button';

export const DbView = () => {
  const queryClient = useQueryClient();
  const loadMutation = useLoad({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCachedItemsQueryKey() });
      },
    },
  });

  const { data } = useItems();

  if (!data) return <div className='p-4 text-center'>...Loading</div>;
  const items = data.data;
  const nodes = buildTree(items);

  const onDoubleClick = (evt: TreeNodeDoubleClickEvent) => {
    const item: ItemBase = evt.node.data;
    loadMutation.mutate({ data: { item_id: item.id } });
  };

  return (
    <div>
      <div>
        <ApplyOpsBtn />
      </div>
      <Tree
        value={nodes}
        nodeTemplate={NodeEl}
        className='md:w-30rem w-full'
        onNodeDoubleClick={onDoubleClick}
      />
    </div>
  );
};

const NodeEl = (node: TreeNode, options: TreeNodeTemplateOptions) => {
  const item: ItemBase = node.data;
  return (
    <div className={options.className}>
      <b>{node.label} </b>
      {item.is_deleted && <span className='text-red-600'>(deleted)</span>}
    </div>
  );
};

const ApplyOpsBtn = () => {
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
