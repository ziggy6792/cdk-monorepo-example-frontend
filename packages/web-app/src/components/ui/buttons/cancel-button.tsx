import React from 'react';
import { Button } from '@material-ui/core';

interface ICancelButtonProps {
    isSubmitting: boolean;
    onClick: () => void;
}

const CancelButton: React.FC<ICancelButtonProps> = props => {
    const { isSubmitting, onClick } = props;
    return (
        <Button type='button' variant='contained' color='secondary' onClick={onClick} disabled={isSubmitting}>
            Cancel
        </Button>
    );
};

export default CancelButton;
