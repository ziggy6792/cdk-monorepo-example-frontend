import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

export interface ISubmitButtonProps {
    disabled?: boolean;
    onClick?: () => Promise<any>;
}

const ProgressButton: React.FC<ISubmitButtonProps> = ({ disabled, onClick, children }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <Button
            disabled={disabled || isSubmitting}
            onClick={async () => {
                setIsSubmitting(true);
                await onClick();
                setIsSubmitting(false);
            }}
        >
            {children}
            {isSubmitting && <CircularProgress size={20} style={{ marginLeft: '1em' }} />}
        </Button>
    );
};

export default ProgressButton;
