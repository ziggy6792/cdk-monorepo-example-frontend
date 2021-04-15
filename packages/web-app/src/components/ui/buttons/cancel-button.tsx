import React from 'react';
import { Button } from '@material-ui/core';

interface ICancelButtonProps {
  isSubmitting?: boolean;
  onClick: () => void;
  text?: string;
}

const CancelButton: React.FC<ICancelButtonProps> = (props) => {
  const { isSubmitting, onClick, text } = props;
  return (
    <Button type='button' variant='contained' color='secondary' onClick={onClick} disabled={isSubmitting}>
      {text}
    </Button>
  );
};

CancelButton.defaultProps = {
  text: 'Cancel',
};

export default CancelButton;
