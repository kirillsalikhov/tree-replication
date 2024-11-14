import React from 'react';
import {
  Tree,
  TreeNodeDoubleClickEvent,
  TreeNodeTemplateOptions,
} from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import {
  getCachedItemsQueryKey,
  ItemBase,
  useItems,
  useLoad,
} from '@/api/api.gen';
import { buildTree } from '@/components/utils';
import { useQueryClient } from '@tanstack/react-query';

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
  let label = <b>{node.label}</b>;

  return <div className={options.className}>{label}</div>;
};
