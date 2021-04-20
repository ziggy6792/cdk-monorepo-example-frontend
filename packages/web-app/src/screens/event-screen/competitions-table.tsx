/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import { Chip, Avatar, CardActionArea, Typography, Button, Accordion, AccordionSummary, AccordionDetails, makeStyles, Grid } from '@material-ui/core';
import { ExpandMore, ArrowForward, Bookmark } from '@material-ui/icons';

import { useHistory } from 'react-router';
import { Competition, User, RiderRank, Maybe, CompetitionStatus } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';
import { ROUTE_COMPETITION } from 'src/config/routes';
import DateFormatter from 'src/utils/format/date-formatter';
import { ICompetitionSummary } from 'src/gql/common/types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  accordion: {
    margin: theme.spacing(0, 1, 2),
    boxShadow: theme.shadows[10],
    position: 'inherit',
  },
  expandedAccordion: {
    margin: '0px 8px 16px !important',
  },
  summary: {
    margin: theme.spacing(1, 0, 0),
  },
  details: {
    background: '#ddd',
    padding: theme.spacing(1),
  },
  date: {
    position: 'inherit',
  },
  dateDay: {
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  dateTime: {
    lineHeight: 1,
    fontSize: '1.2rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  compName: {},
  compNameWrapper: {
  },
  chip: {
    height: 14,
    marginLeft: 8,
  },
}));

interface IEventsTableProps {
  competitions: ICompetitionSummary[];
}

const CompetitionsTable: React.FC<IEventsTableProps> = ({ competitions }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      {competitions.map((competition) => {
        const hasDate = DateFormatter.toDay(competition.startTime) !== 'TBD';
        return (
          <div className={classes.root} key={`${competition.id}-${competition.startTime || 'thing'}`}>
            <Accordion classes={{ root: classes.accordion, expanded: classes.expandedAccordion }}>
              <AccordionSummary
                expandIcon={<ExpandMore style={{ position: 'inherit' }} />}
                aria-controls='panel1a-content'
                id='panel1a-header'
                className={classes.summary}
              >
                <Grid container alignItems='center' spacing={1}>
                  <Grid item xs={3}>
                    <Typography variant='h5' className={classes.dateDay} component='div'>
                      {DateFormatter.toDay(competition.startTime)}
                    </Typography>
                    {hasDate && (
                      <Typography variant='h5' className={classes.dateTime} component='div'>
                        {DateFormatter.toTime(competition.startTime)}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant='h4' component='div'>
                      {competition.name}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <Grid container>
                  <Grid item xs={12}>
                    {competition.rankedRiders.items.map((riderRank, index) => {
                      const riderName = riderRank.user.fullName;
                      const contestantNumber = `${index + 1}. `;

                      const isFinished = competition.status === CompetitionStatus.Finished;

                      const riderIsFirst = isFinished && index === 0;
                      const riderIsSecond = isFinished && index === 1;
                      const riderIsThird = isFinished && index === 2;

                      // TODO
                      let contestantLabel = null;
                      if (riderIsFirst) {
                        contestantLabel = '1st';
                      } else if (riderIsSecond) {
                        contestantLabel = '2nd';
                      } else if (riderIsThird) {
                        contestantLabel = '3rd';
                      }

                      return (
                        <Grid container style={{ margin: 8 }}>
                          <Grid item>
                            <Typography variant='h6' color='textSecondary' style={{ fontSize: '1rem', lineHeight: 1, width: 24 }} component='div'>
                              {contestantNumber}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='h6' style={{ fontSize: '1rem', lineHeight: 1 }} component='div'>
                              {riderName}
                            </Typography>
                          </Grid>
                          {contestantLabel && <Chip className={classes.chip} label={contestantLabel} size='small' color='primary' />}
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                      onClick={() => history.push(`${ROUTE_COMPETITION}/${competition.id}`)}
                      variant='contained'
                      color='primary'
                      startIcon={<ArrowForward />}
                    >
                      Go to Competition
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </>
  );
};

export default CompetitionsTable;
