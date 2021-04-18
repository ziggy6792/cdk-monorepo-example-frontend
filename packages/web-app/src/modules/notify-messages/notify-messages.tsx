/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid , Typography} from '@material-ui/core';
import React, { Fragment } from 'react';

export enum NotifyMessageType {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
}

export interface INotifyMessage {
  type: NotifyMessageType;
  message: React.ReactNode;
  action?: React.ReactNode;
}

export interface INotifyMessageProps {
  notifyMessage: INotifyMessage;
}

const NotifyMessage: React.FC<INotifyMessageProps> = ({ notifyMessage: { type, message, action } }) => (
  <>
    <Grid container direction='row' spacing={2}>
      <Grid item sm={2}>
        <Typography variant='h4'>{type}</Typography>
      </Grid>
      <Grid item sm={8}>
        <Typography variant='subtitle2'>{message}</Typography>
      </Grid>
      <Grid item sm={2}>
        {action}
      </Grid>
    </Grid>
  </>
);

export interface INotifyMessagesProps {
  notifyMessages: INotifyMessage[];
}

const NotifyMessages: React.FC<INotifyMessagesProps> = ({ notifyMessages }) => (
  <>
    <Grid container style={{ padding: 16 }}>
      <>
        {[NotifyMessageType.ERROR, NotifyMessageType.WARN].map((groupType) => (
          <Fragment key={groupType}>
            {notifyMessages.map((notifyMessage, i) => (
              <Grid item key={`message-${i}`}>
                {notifyMessage.type === groupType && <NotifyMessage notifyMessage={notifyMessage} />}
              </Grid>
            ))}
          </Fragment>
        ))}
      </>
    </Grid>
  </>
);

export default NotifyMessages;
