import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import CancelButton from 'src/components/ui/buttons/cancel-button';
import ProgressButton from 'src/components/ui/buttons/progress-button';

interface IConfirmBox {
    title?: string;
    confirmButton: {
        onClick: () => Promise<void>;
        text?: string;
        disabled?: boolean;
    };
    cancelButton: {
        onClick: () => void;
        text?: string;
        disabled?: boolean;
    };
}

const ConfirmBox: React.FC<IConfirmBox> = props => {
    const { title, children, confirmButton, cancelButton } = props;

    const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

    return (
        <Grid container>
            {title && (
                <Grid container direction='row' justify='center'>
                    <Grid item>
                        <Typography variant='h3' gutterBottom>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {children}
            <Grid container direction='row' justify='center' spacing={2}>
                <Grid item>
                    <ProgressButton
                        variant='contained'
                        onClick={
                            confirmButton.onClick
                                ? async () => {
                                      setInternalIsSubmitting(true);
                                      await confirmButton.onClick();
                                      setInternalIsSubmitting(false);
                                  }
                                : undefined
                        }
                        disabled={confirmButton.disabled || internalIsSubmitting}
                    >
                        {confirmButton.text || 'OK'}
                    </ProgressButton>
                </Grid>
                <Grid item>
                    <CancelButton onClick={cancelButton.onClick} text={cancelButton.text} isSubmitting={cancelButton.disabled || internalIsSubmitting} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ConfirmBox;
