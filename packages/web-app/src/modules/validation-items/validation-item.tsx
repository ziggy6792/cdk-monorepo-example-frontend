/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid, Link } from '@material-ui/core';
import React from 'react';
import { ValidationItem, ValidationItemMessage } from 'src/generated-types';

interface ValidationItemProps {
    validationItem: ValidationItem;
    validationActions?: { [key in ValidationItemMessage]: (validationItem: ValidationItem) => React.ReactNode };
}

const ValidationEntry: React.FC<ValidationItemProps> = ({ validationItem, validationActions }) => (
    <>
        <Grid container key={validationItem.message} direction='row' spacing={2}>
            <Grid item sm={2}>
                {validationItem.type}
            </Grid>
            <Grid item sm={8}>
                {validationItem.messageDisplayText}
            </Grid>
            <Grid item sm={2}>
                {/* {validationItem.message === ValidationItemMessage.OpenheatAlreadyopen && <Link>Open Scoreboard</Link>} */}
                {validationActions && validationActions[validationItem.message] && validationActions[validationItem.message](validationItem)}
            </Grid>
        </Grid>
    </>
);

export default ValidationEntry;
