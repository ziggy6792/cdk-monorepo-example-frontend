/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid } from '@material-ui/core';
import React from 'react';
import { ValidationItem, ValidationItemMessage } from 'src/generated-types';

export type ValidationItemContent = Partial<
    Record<
        ValidationItemMessage,
        { action?: (validationItem: ValidationItem) => React.ReactNode; message: (validationItem: ValidationItem) => React.ReactNode }
    >
>;

interface ValidationItemProps {
    validationItem: ValidationItem;
    validationItemContent?: ValidationItemContent;
}

const ValidationEntry: React.FC<ValidationItemProps> = ({ validationItem, validationItemContent }) => {
    const myValidationItemContent = validationItemContent && validationItemContent[validationItem.message];

    const { message, action } = myValidationItemContent;

    return (
        <>
            <Grid container key={validationItem.message} direction='row' spacing={2}>
                <Grid item sm={2}>
                    {validationItem.type}
                </Grid>
                <Grid item sm={8}>
                    {message && message(validationItem)}
                </Grid>
                <Grid item sm={2}>
                    {action && action(validationItem)}
                </Grid>
            </Grid>
        </>
    );
};

export default ValidationEntry;
