import {
  Tree,
  TreeNodeDoubleClickEvent,
  TreeNodeTemplateOptions,
} from 'primereact/tree';
import React, { useState } from 'react';
import { ItemBase, useCachedItems } from '@/api/api.gen';
import { buildTree } from '@/components/utils';
import { TreeNode } from 'primereact/treenode';
import { Button } from 'primereact/button';
import { ResetCacheBtn } from '@/components/reset-cache-btn';
import { useExpandable } from '@/hooks/use-expandable';
import { NodeView } from '@/components/cache-view/node-view';
import { NodeEdit } from '@/components/cache-view/node-edit';

export const CacheView = () => {
  const { data } = useCachedItems();
  const [editedId, setEditId] = useState<string | null>(null);
  const { expandAll, collapseAll, expandedKeys, setExpandedKeys } =
    useExpandable(data?.data);

  if (!data) return <div className='p-4 text-center'>...Loading</div>;
  const cachedItems = data.data;

  const nodes = buildTree(cachedItems, (node, item) => {
    if (item.is_deleted) {
      node.className += ' bg-red-100';
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
      return <NodeEdit item={item} onClose={onEditClose} />;
    }
    return <NodeView item={item} className={options.className} />;
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
        <ResetCacheBtn />
      </div>
      <Tree
        value={nodes}
        nodeTemplate={nodeTemplate}
        onNodeDoubleClick={onDoubleClick}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        className='md:w-30rem w-full'
      />
    </div>
  );
};
