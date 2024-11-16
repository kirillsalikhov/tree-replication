import React, { useState } from 'react';
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
import { ResetPresetBtn } from '@/components/reset-preset-btn';
import { ApplyOpsBtn } from '@/components/apply-ops-btn';
import { Button } from 'primereact/button';
import { useExpandable } from '@/hooks/use-expandable';

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
  const { expandAll, collapseAll, expandedKeys, setExpandedKeys } =
    useExpandable(data?.data);

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
        <Button
          type='button'
          icon='pi pi-plus'
          size='small'
          label='Expand All'
          onClick={expandAll}
        />
        <Button
          type='button'
          icon='pi pi-minus'
          size='small'
          label='Collapse All'
          onClick={collapseAll}
        />

        <ApplyOpsBtn />
        <ResetPresetBtn />
      </div>
      <Tree
        value={nodes}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
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
