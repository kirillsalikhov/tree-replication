import { Button } from 'primereact/button';
import React from 'react';

interface ExpandAllBtnProps {
  onClick: () => void;
}

export const ExpandAllBtn = ({ onClick }: ExpandAllBtnProps) => (
  <Button
    type='button'
    icon='pi pi-plus'
    severity='secondary'
    text
    size='small'
    label='Expand All'
    onClick={onClick}
  />
);
