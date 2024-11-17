import React, { useRef, useState } from 'react';
import { Tree, TreeNodeDoubleClickEvent } from 'primereact/tree';
import { ContextMenu } from 'primereact/contextmenu';
import { ResetPresetBtn } from '@/components/reset-preset-btn';
import { useExpandable } from '@/hooks/use-expandable';
import { NodeItem } from '@/components/db-view/node-item';
import { useLoadMutation } from '@/api/use-load-mutation';
import { ItemBase } from '@/api/gen/api.schemas';
import { useItems } from '@/api/gen/items/items';
import {
  ExpandAllBtn,
  CollapseAllBtn,
  buildTree,
} from '@/components/tree-common';

export const DbView = () => {
  const { data } = useItems();
  const { expandAll, collapseAll, expandedKeys, setExpandedKeys } =
    useExpandable(data?.data);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(
    undefined,
  );

  const loadMutation = useLoadMutation();

  const cm = useRef<ContextMenu>(null);

  if (!data) return <div className='p-4 text-center'>...Loading</div>;
  const items = data.data;
  const nodes = buildTree(items);

  const loadToCache = (id: string) =>
    loadMutation.mutate({ data: { item_id: id } });

  const onDoubleClick = (evt: TreeNodeDoubleClickEvent) => {
    const item: ItemBase = evt.node.data;
    loadToCache(item.id);
  };

  const menu = [
    {
      label: 'Load to Cache',
      icon: 'pi pi-angle-double-left',
      command: () => selectedNodeKey && loadToCache(selectedNodeKey),
    },
  ];

  return (
    <>
      <div className='flex items-center justify-between pb-2'>
        <div className='flex gap-2'>
          <ExpandAllBtn onClick={expandAll} />
          <CollapseAllBtn onClick={collapseAll} />
        </div>
        <div className='flex gap-2'>
          <ResetPresetBtn />
        </div>
      </div>
      <ContextMenu model={menu} ref={cm} />
      <Tree
        className='md:w-30rem w-full'
        value={nodes}
        nodeTemplate={NodeItem}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        onNodeDoubleClick={onDoubleClick}
        contextMenuSelectionKey={selectedNodeKey}
        onContextMenuSelectionChange={(e) =>
          setSelectedNodeKey(e.value as string)
        }
        onContextMenu={(e) => cm.current?.show(e.originalEvent)}
      />
    </>
  );
};
