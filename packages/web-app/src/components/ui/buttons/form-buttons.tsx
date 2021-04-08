import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import FormCancelButton from './form-cancel-button';
import FormSubmitButton, { ISubmitButtonProps } from './form-submit-button';

interface IFormButtonsProps extends ISubmitButtonProps {
    onCancel: () => void;
}

const FormButtons: React.FC<IFormButtonsProps> = (props) => {
    const theme = useTheme();

    const { isSubmitting, dirty, allowSubmitPristine, isValid, onCancel } = props;
    return (
        <Grid container direction='row' justify='center' alignItems='center' style={{ marginTop: theme.spacing(2) }} spacing={2}>
            <Grid item>
                <FormSubmitButton isSubmitting={isSubmitting} dirty={dirty} allowSubmitPristine={allowSubmitPristine} isValid={isValid} />
            </Grid>
            <Grid item>
                {/* <Button type="button" variant="contained" className={classes.dangerButton}  onClick={onClose}> */}
                <FormCancelButton onClick={onCancel} isSubmitting={isSubmitting} />
            </Grid>
            {props.children}
        </Grid>
    );
};

export default FormButtons;
