/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import { 
  Chip, 
  Avatar, 
  CardActionArea, 
  Typography, 
  Button, 
  Accordion, 
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Grid
} from '@material-ui/core';
import { ExpandMore, ArrowForward,Bookmark } from '@material-ui/icons';

import { useHistory } from 'react-router';
import { Competition, User } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';
import { ROUTE_COMPETITION } from 'src/config/routes';
import DateFormatter from 'src/utils/format/date-formatter';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  accordion: {
    margin: theme.spacing(0,1,2),
    boxShadow: theme.shadows[10]
  },
  expandedAccordion: {
    margin: '0px 8px 16px !important',
  },
  summary: {
    margin: theme.spacing(1,0,0),
  },
  details: {
    background: '#ddd',
    padding: theme.spacing(1)
  },
  date: {
    width: 80
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
  compName: {
    // fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  chip:{
    height: 14,
    marginLeft: 8
  }
}));


type CompetitionItem = Pick<Competition, 'id' | 'name' | 'startTime'> & { judgeUser?: Pick<User, 'fullName'> };

interface IEventsTableProps {
  competitions: CompetitionItem[];
}

interface ICompetitionRow extends IDataTableRow {
  competitionId: string;
}

const CompetitionsTable: React.FC<IEventsTableProps> = ({ competitions }) => {
  const history = useHistory();
  const classes = useStyles();

  const tableData: ICompetitionRow[] = competitions.map((competition) => ({
    competitionId: competition.id,
    rowData: {
      name: competition.name,
      judge: competition.judgeUser?.fullName,
    },
  }));

  const columns = [
    {
      name: 'name',
      label: 'Competition',
    },
    {
      name: 'judge',
      label: 'Judge',
    },
  ];


  return (
    <>
      {competitions.map((competition) => {
        const hasDate = DateFormatter.toDay(competition.startTime) !== 'TBD';
        return (
          <div className={classes.root} key={`${competition.id}-${competition.startTime || 'thing'}`}>
            <Accordion classes={{ root: classes.accordion, expanded: classes.expandedAccordion }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.summary}
              >
                <Grid container alignItems='center'>
                  <Grid item className={classes.date}>
                    <Typography variant="h5" className={classes.dateDay} component="div">
                      {DateFormatter.toDay(competition.startTime)}
                    </Typography>
                    {hasDate && (
                      <Typography variant="h5" className={classes.dateTime} component="div">
                        {DateFormatter.toTime(competition.startTime)}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.compName} component="div">
                      {competition.name}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails 
                className={classes.details}
              >
                <Grid container>
                  <Grid item xs={12} >
                    {
                      ['John Tan', 'Jason Tim', 'Peter Lim', 'Simon Cowell', 'John Tan', 'Jason Tim', 'Peter Lim', 'Simon Cowell'].map((contestant, index) => {
                        // console.log(contestant)
                        // TODO: replace with real ppl
                        const contestantName = contestant
                        const contestantNumber = `${index + 1}. `

                        const contestantIsFirst = index === 0;
                        const contestantIsSecond = index === 1;
                        const contestantIsThird = index === 2;

                        // TODO
                        let contestantLabel = null;
                        if(contestantIsFirst) {
                          contestantLabel = '1st'
                        }else if(contestantIsSecond) {
                          contestantLabel = '2nd'
                        }else if(contestantIsThird) {
                          contestantLabel = '3rd'
                        }

                        return(
                          <Grid container style={{ margin: 8 }}>
                            <Grid item>
                              <Typography variant='h6' color='textSecondary' style={{ fontSize: '1rem', lineHeight: 1, width: 24 }} component='div'>
                                {contestantNumber}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant='h6' style={{ fontSize: '1rem', lineHeight: 1 }} component='div'>
                                {contestantName}
                              </Typography>
                            </Grid>
                            {contestantLabel && <Chip className={classes.chip} label={contestantLabel} size='small' color='primary' />}
                          </Grid>
                        )
                      })
                    }
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
        )
      })}
    </>
  );

  // return (
  //   <DataTable
  //     title='Competitions'
  //     tableData={tableData}
  //     columns={columns}
  //     options={{
  //       onRowClick: (row: ICompetitionRow) => {
  //         history.push(`${ROUTE_COMPETITION}/${row.competitionId}`);
  //       },
  //     }}
  //   />
  // );
};

export default CompetitionsTable;
