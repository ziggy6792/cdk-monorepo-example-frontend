/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid } from '@material-ui/core';
import React from 'react';
import { ValidationItemBase } from 'src/generated-types';

// export type ValidationItemContent = Partial<
//     Record<
//         ValidationItemMessage,
//         { action?: (validationItem: ValidationItem) => React.ReactNode; message: (validationItem: ValidationItem) => React.ReactNode }
//     >
// >;

export type ValidationItemContent = (ValidationItemBase: ValidationItemBase) => { action?: React.ReactNode; message: React.ReactNode };

interface ValidationItemProps {
    validationItem: ValidationItemBase;
    validationItemContent?: ValidationItemContent;
}

const ValidationEntry: React.FC<ValidationItemProps> = ({ validationItem, validationItemContent }) => {
    const { message, action } = validationItemContent(validationItem);

    return (
        <>
            <Grid container key={validationItem.message} direction='row' spacing={2}>
                <Grid item sm={2}>
                    {validationItem.type}
                </Grid>
                <Grid item sm={8}>
                    {message}
                </Grid>
                <Grid item sm={2}>
                    {action}
                </Grid>
            </Grid>
        </>
    );
};

export default ValidationEntry;
