import { TreeNode } from 'primereact/treenode';
import { ItemBase } from '@/api/gen/api.schemas';

type TreeWalkContext = {
  ancestorDeleted?: boolean;
};

type ProcessNode = (node: TreeNode, context: TreeWalkContext) => void;

export function buildTree(items: ItemBase[], processNode?: ProcessNode) {
  const nodes: TreeNode[] = [];
  items
    .reduce((acc, v) => {
      return acc.set(v.id, {
        key: v.id,
        label: v.value,
        data: v,
        children: [],
      });
    }, new Map<string, TreeNode>())
    .forEach((node, id: string, idx) => {
      const parent_id = node.data.parent_id;
      if (idx.has(parent_id)) {
        idx.get(parent_id)!.children!.push(node);
      } else {
        nodes.push(node);
      }
    });

  if (processNode) walk(nodes, processNode);

  return nodes;
}

const walk = (
  nodes: TreeNode[],
  processNode: ProcessNode,
  context: TreeWalkContext = {},
) => {
  nodes.forEach((node) => {
    processNode(node, context);

    const childrenContext = {
      ...context,
      ancestorDeleted: context.ancestorDeleted || node.data.is_deleted,
    };

    if (node.children?.length) {
      walk(node.children, processNode, childrenContext);
    }
  });
};
