/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid } from '@material-ui/core';
import React from 'react';
import { ValidationItem, ValidationItemType } from 'src/generated-types';

interface ValidationItemsProps {
    validationItems: ValidationItem[];
}

const ValidationItems: React.FC<ValidationItemsProps> = ({ validationItems }) => (
    <>
        <Grid container style={{ padding: 16 }}>
            <>
                {[ValidationItemType.Error, ValidationItemType.Warn].map((type) => (
                    <>
                        {validationItems.map((validationItem) => (
                            <Grid item key={type}>
                                {validationItem.type === type && (
                                    <Grid container key={validationItem.message} direction='row'>
                                        <Grid item sm={3}>
                                            {validationItem.type}
                                        </Grid>
                                        <Grid item sm={9}>
                                            {validationItem.message}
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </>
                ))}
            </>
        </Grid>
    </>
);

export default ValidationItems;
