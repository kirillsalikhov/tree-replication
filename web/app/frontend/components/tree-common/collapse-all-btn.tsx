import { Button } from 'primereact/button';
import React from 'react';

interface CollapseAllBtnProps {
  onClick: () => void;
}

export const CollapseAllBtn = ({ onClick }: CollapseAllBtnProps) => (
  <Button
    type='button'
    icon='pi pi-minus'
    severity='secondary'
    text
    size='small'
    label='Collapse All'
    onClick={onClick}
  />
);
