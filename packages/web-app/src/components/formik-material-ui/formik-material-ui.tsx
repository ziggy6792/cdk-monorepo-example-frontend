/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { makeStyles } from '@material-ui/core';
import { TextField, TextFieldProps } from 'formik-material-ui';

export const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: '100%',
    },
    message: {
        border: `2px solid ${theme.palette.primary}`,
        borderRadius: 5,
    },
}));

export const TextArea: React.FC<TextFieldProps> = (props) => {
    const classes = useStyles();
    return <TextField {...props} multiline rows={10} className={classes.message} />;
};
