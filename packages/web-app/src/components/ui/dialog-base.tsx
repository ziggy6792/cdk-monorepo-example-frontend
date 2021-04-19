import React from 'react';
import { Box } from '@material-ui/core';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';

export interface IProps {
  open: boolean;
  onClose: () => void;
  fullWidth?: boolean;
  maxWidth?: DialogProps['maxWidth'];
}

const DialogBase: React.FC<IProps> = ({ onClose, open, children }) => {
  const [fullWidth, setFullWidth] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  return (
    <Dialog onBackdropClick={onClose} fullWidth={fullWidth} maxWidth={maxWidth} onClose={onClose} aria-labelledby='dialog-base' open={open}>
      <Box p={2}>{children}</Box>
    </Dialog>
  );
};

export default DialogBase;
