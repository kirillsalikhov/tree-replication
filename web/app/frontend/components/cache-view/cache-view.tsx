import {
  Tree,
  TreeNodeDoubleClickEvent,
  TreeNodeTemplateOptions,
} from 'primereact/tree';
import React, { useRef, useState } from 'react';
import { TreeNode } from 'primereact/treenode';
import { ContextMenu } from 'primereact/contextmenu';
import { buildTree } from '@/components/utils';
import { ResetCacheBtn } from '@/components/reset-cache-btn';
import { useExpandable } from '@/hooks/use-expandable';
import { NodeView } from '@/components/cache-view/node-view';
import { NodeEdit } from '@/components/cache-view/node-edit';
import { useCreateMutation } from '@/api/use-create-mutation';
import { useRemoveMutation } from '@/api/use-remove-mutation';
import { useCachedItems } from '@/api/gen/cached-items/cached-items';
import { ItemBase } from '@/api/gen/api.schemas';
import { ExpandAllBtn, CollapseAllBtn } from '@/components/tree-common';
import { ApplyOpsBtn } from '@/components/apply-ops-btn';

export const CacheView = () => {
  const { data } = useCachedItems();
  const removeMutation = useRemoveMutation();
  const { createDefault } = useCreateMutation();

  const [editedId, setEditId] = useState<string | null>(null);
  const { expandAll, collapseAll, expandedKeys, setExpandedKeys } =
    useExpandable(data?.data);

  const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(
    undefined,
  );
  const cm = useRef<ContextMenu>(null);

  if (!data) return <div className='p-4 text-center'>...Loading</div>;

  const nodes = buildTree(data.data, (node, item) => {
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

  const menu = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => selectedNodeKey && setEditId(selectedNodeKey),
    },
    {
      label: 'Create new child',
      icon: 'pi pi-plus',
      command: () => selectedNodeKey && createDefault(selectedNodeKey),
    },
    {
      label: 'Delete',
      icon: 'pi pi-times text-red-400',
      command: () =>
        selectedNodeKey && removeMutation.mutate({ id: selectedNodeKey }),
    },
  ];

  const nodeTemplate = (node: TreeNode, options: TreeNodeTemplateOptions) => {
    const item: ItemBase = node.data;
    if (item.id === editedId) {
      return <NodeEdit item={item} onClose={onEditClose} />;
    }
    return <NodeView item={item} className={options.className} />;
  };

  return (
    <div>
      <div className='flex items-center justify-between pb-2'>
        <div className='flex gap-2'>
          <ExpandAllBtn onClick={expandAll} />
          <CollapseAllBtn onClick={collapseAll} />
        </div>
        <div className='flex gap-2'>
          <ResetCacheBtn />
          <ApplyOpsBtn />
        </div>
      </div>
      <ContextMenu model={menu} ref={cm} />
      <Tree
        className='md:w-30rem w-full'
        value={nodes}
        nodeTemplate={nodeTemplate}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        onNodeDoubleClick={onDoubleClick}
        contextMenuSelectionKey={selectedNodeKey}
        onContextMenuSelectionChange={(e) =>
          setSelectedNodeKey(e.value as string)
        }
        onContextMenu={(e) => cm.current?.show(e.originalEvent)}
      />
    </div>
  );
};
