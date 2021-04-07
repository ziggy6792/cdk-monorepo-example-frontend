import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

export interface ISubmitButtonProps {
    disabled?: boolean;
    onClick?: () => Promise<any>;
    isSubmitting?: boolean;
}

const ProgressButton: React.FC<ISubmitButtonProps> = ({ disabled, onClick, children, isSubmitting }) => {
    const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
    return (
        <Button
            disabled={disabled || internalIsSubmitting}
            onClick={
                onClick
                    ? async () => {
                          setInternalIsSubmitting(true);
                          await onClick();
                          setInternalIsSubmitting(false);
                      }
                    : undefined
            }
        >
            {children}
            {(isSubmitting !== undefined ? isSubmitting : internalIsSubmitting) && <CircularProgress size={20} style={{ marginLeft: '1em' }} />}
        </Button>
    );
};

export default ProgressButton;
