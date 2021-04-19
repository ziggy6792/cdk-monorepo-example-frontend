import React from 'react';
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { Grid, Typography } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { IRiderAllocationItem } from 'src/gql/common/types';

export interface IProps {
  riderAllocations: IRiderAllocationItem[];
  noProgressing: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  tableTitle: {
    marginBottom: theme.spacing(1)
  },
  bottomTable: {
    marginTop: theme.spacing(4),
  },
}));

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      textTransform: 'uppercase',
      fontWeight: 600,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const RiderRankList: React.FC<IProps> = ({ riderAllocations, noProgressing }) => {
  const classes = useStyles();

  const qualified = riderAllocations.slice(0, noProgressing);
  const runnersUp = riderAllocations.slice(noProgressing);

  return (
    <Grid container>
      <Grid item xs={12}>
        <RiderTable riders={qualified} title='Qualifiers' />
      </Grid>
      <Grid item xs={12} className={classes.bottomTable}>
        <RiderTable title='Runners-Up' riders={runnersUp} />
      </Grid>
    </Grid>
  );
};

interface IRiderTable {
  riders: IRiderAllocationItem[];
  title: string;
}

const RiderTable: React.FC<IRiderTable> = ({ riders, title }) => {
  const classes = useStyles();

  const renderRow = (rider: IRiderAllocationItem) => (
    <TableRow key={rider.userId}>
      <TableCell align='left'>{rider.position}</TableCell>
      <TableCell align='left'>{rider.user.fullName}</TableCell>
      {rider.runs.map((run, index) => (
        <TableCell key={`table-score-${index + 1}`} align='left'>
          {run.score}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderRuns = (index) => <StyledTableCell key={`table-${index + 1}`} align='left'>{`Run ${index + 1}`}</StyledTableCell>;
  return (
    <>
      <Typography className={classes.tableTitle} variant='h4'>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>Position</StyledTableCell>
              <StyledTableCell align='left'>Name</StyledTableCell>
              {riders[0]?.runs.map((run, index) => renderRuns(index))}
            </TableRow>
          </TableHead>
          <TableBody>{riders.map((rider) => renderRow(rider))}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RiderRankList;
