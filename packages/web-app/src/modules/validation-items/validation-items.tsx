/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid } from '@material-ui/core';
import React from 'react';
import { ValidationItem, ValidationItemType, ValidationItemMessage } from 'src/generated-types';
import ValidationEntry from './validation-item';

interface ValidationItemsProps {
    validationItems: ValidationItem[];
    validationActions?: { [key in ValidationItemMessage]: (validationItem: ValidationItem) => React.ReactNode };
}

const ValidationItems: React.FC<ValidationItemsProps> = ({ validationItems, validationActions }) => (
    <>
        <Grid container style={{ padding: 16 }}>
            <>
                {[ValidationItemType.Error, ValidationItemType.Warn].map((type) => (
                    <>
                        {validationItems.map((validationItem) => (
                            <Grid item key={type}>
                                {validationItem.type === type && <ValidationEntry validationItem={validationItem} validationActions={validationActions} />}
                            </Grid>
                        ))}
                    </>
                ))}
            </>
        </Grid>
    </>
);

export default ValidationItems;
