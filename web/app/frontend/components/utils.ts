import { TreeNode } from 'primereact/treenode';
import { ItemBase } from '@/api/gen/api.schemas';

type ProcessNode = (node: TreeNode, item: ItemBase) => TreeNode;

export function buildTree(
  items: ItemBase[],
  processNode: ProcessNode = (node) => node,
) {
  const nodes: TreeNode[] = [];
  items
    .reduce((acc, v) => {
      const node = {
        key: v.id,
        label: v.value,
        data: v,
        children: [],
      };

      acc.set(v.id, processNode(node, v));
      return acc;
    }, new Map<string, TreeNode>())
    .forEach((node, id: string, idx) => {
      const parent_id = node.data.parent_id;
      if (idx.has(parent_id)) {
        idx.get(parent_id)!.children!.push(node);
      } else {
        nodes.push(node);
      }
    });
  return nodes;
}
