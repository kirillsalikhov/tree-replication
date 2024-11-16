import { TreeNode } from 'primereact/treenode';
import { TreeNodeTemplateOptions } from 'primereact/tree';
import { ItemBase } from '@/api/api.gen';
import React from 'react';

export const NodeItem = (node: TreeNode, options: TreeNodeTemplateOptions) => {
  const item: ItemBase = node.data;
  return (
    <div className={options.className}>
      <b>{node.label} </b>
      {item.is_deleted && <span className='text-red-600'>(deleted)</span>}
    </div>
  );
};
