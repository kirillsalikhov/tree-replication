import { useState } from 'react';

interface WithId {
  id: string;
}

export const useExpandable = (items: WithId[] = []) => {
  const [expandedKeys, setExpandedKeys] = useState({});
  const expandAll = () => {
    const keys = items.reduce<Record<string, boolean>>((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {});
    setExpandedKeys(keys);
  };
  const collapseAll = () => setExpandedKeys({});

  return { expandedKeys, setExpandedKeys, expandAll, collapseAll };
};
