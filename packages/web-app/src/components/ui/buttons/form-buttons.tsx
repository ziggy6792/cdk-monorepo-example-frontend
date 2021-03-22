import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import CancelButton from './cancel-button';
import SubmitButton, { ISubmitButtonProps } from './submit-button';

interface IFormButtonsProps extends ISubmitButtonProps {
    onCancel: () => void;
}

const FormButtons: React.FC<IFormButtonsProps> = props => {
    const theme = useTheme();

    const { isSubmitting, dirty, allowSubmitPristine, isValid, onCancel } = props;
    return (
        <Grid container direction='row' justify='center' alignItems='center' style={{ marginTop: theme.spacing(2) }} spacing={2}>
            <Grid item>
                <SubmitButton isSubmitting={isSubmitting} dirty={dirty} allowSubmitPristine={allowSubmitPristine} isValid={isValid} />
            </Grid>
            {props.children}
            <Grid item>
                {/* <Button type="button" variant="contained" className={classes.dangerButton}  onClick={onClose}> */}
                <CancelButton onClick={onCancel} isSubmitting={isSubmitting} />
            </Grid>
        </Grid>
    );
};

export default FormButtons;
