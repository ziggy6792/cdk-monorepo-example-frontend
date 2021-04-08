/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react';

export enum ValidationMessageType {
    ERROR = 'ERROR',
    WARN = 'WARN',
}

export interface IValidationMessage {
    type: ValidationMessageType;
    message: React.ReactNode;
    action: React.ReactNode;
}

export interface IValidationMessageProps {
    validationMessage: IValidationMessage;
}

const ValidationMessage: React.FC<IValidationMessageProps> = ({ validationMessage: { type, message, action } }) => (
    <>
        <Grid container direction='row' spacing={2}>
            <Grid item sm={2}>
                {type}
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

export interface IValidationMessagesProps {
    validationMessages: IValidationMessage[];
}

const ValidationMessages: React.FC<IValidationMessagesProps> = ({ validationMessages }) => (
    <>
        <Grid container style={{ padding: 16 }}>
            <>
                {[ValidationMessageType.ERROR, ValidationMessageType.WARN].map((groupType) => (
                    <Fragment key={groupType}>
                        {validationMessages.map((validationMessage, i) => (
                            <Grid item key={`message-${i}`}>
                                {validationMessage.type === groupType && <ValidationMessage validationMessage={validationMessage} />}
                            </Grid>
                        ))}
                    </Fragment>
                ))}
            </>
        </Grid>
    </>
);

export default ValidationMessages;
