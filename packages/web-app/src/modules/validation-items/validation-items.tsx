/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ValidationItem, ValidationItemType } from 'src/generated-types';
import ValidationEntry, { ValidationItemContent } from './validation-item';

interface ValidationItemsProps {
    validationItems: ValidationItem[];
    validationItemContent?: ValidationItemContent;
}

const ValidationItems: React.FC<ValidationItemsProps> = ({ validationItems, validationItemContent }) => (
    <>
        <Grid container style={{ padding: 16 }}>
            <>
                {[ValidationItemType.Error, ValidationItemType.Warn].map(type => (
                    <Fragment key={type}>
                        {validationItems.map(validationItem => (
                            <Grid item key={validationItem.message}>
                                {validationItem.type === type && (
                                    <ValidationEntry validationItem={validationItem} validationItemContent={validationItemContent} />
                                )}
                            </Grid>
                        ))}
                    </Fragment>
                ))}
            </>
        </Grid>
    </>
);

export default ValidationItems;
