/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';

import _ from 'lodash';
import { makeStyles, Card, Typography } from '@material-ui/core';

import { useHistory } from 'react-router';
import DateFormatter from 'src/utils/format/date-formatter';
import { ROUTE_EVENT } from 'src/config/routes';
import image from 'src/background.jpg'

export const useStyles = makeStyles(theme => ({
  cardWrapper: {
    position: 'relative',
    backgroundImage: 'linear-gradient(45deg, #383838, #4a4a4a60)',
  },
  image: {
    width: '100%',
    filter: 'grayscale(1)'
  },
  cardHeader: {
    backgroundImage: `linear-gradient(45deg, #17a3c3d0, #2a6db060)`,
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: theme.spacing(1.5)
  },
  eventTitle: {
    color: 'white',
  },
  eventSubtitle: {
    color: '#ffffffcc',
    lineHeight: 0.9,
    fontSize: '1rem',
    marginTop: theme.spacing(1)
  }
}));

interface EventCardProps {
  event: {
    id: string;
    name: string;
    status?: string;
    startTime?: Date;
    createdAt?: Date;
    modifiedAt?: Date;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleEventCardClick = () => {
    history.push(`${ROUTE_EVENT}/${event.id}`);
  }

  const dateString = DateFormatter.toVerbose(event.startTime);

  return (
    <Card elevation={10} onClick={handleEventCardClick} className={classes.cardWrapper}>
      <img src={image} alt='background' className={classes.image} />
      <div className={classes.cardHeader}>
        <Typography variant="h3" component="div" className={classes.eventTitle}>{event.name}</Typography>
        <Typography variant="subtitle1" component="div" className={classes.eventSubtitle}>{dateString || '24th April'}</Typography>
      </div>
    </Card>
  );
};

export default EventCard;
