/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { FormControl, InputLabel, makeStyles, MenuItem } from '@material-ui/core';
import { Field } from 'formik';
import { TextField, TextFieldProps, Select as SelectFormikUi, SelectProps } from 'formik-material-ui';
import { Catalog } from 'src/config/catalogs';

export const useStyles = makeStyles(theme => ({
    formControl: {
        // margin: theme.spacing(1),
        width: '100%',
        minWidth: '200px',
    },
    message: {
        border: `2px solid ${theme.palette.primary}`,
        borderRadius: 5,
    },
}));

export const TextArea: React.FC<TextFieldProps> = props => {
    const classes = useStyles();
    return <TextField {...props} multiline rows={10} className={classes.message} />;
};

interface IMySelectProps extends SelectProps {
    options: Catalog;
    idField: string;
    getOptionLabel: (option) => string;
}

export const Select: React.FC<IMySelectProps> = props => {
    const { options, idField, getOptionLabel, ...rest } = props;

    const labelName = `${props.field.name}-label`;

    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor={labelName}>{props.label}</InputLabel>
            <Field
                component={SelectFormikUi}
                {...rest}
                inputProps={{
                    id: labelName,
                }}
            >
                {options.map(option => (
                    <MenuItem value={option[idField || 'id']} key={option[idField || 'id']}>
                        {getOptionLabel(option)}
                    </MenuItem>
                ))}
            </Field>
        </FormControl>
    );
};
