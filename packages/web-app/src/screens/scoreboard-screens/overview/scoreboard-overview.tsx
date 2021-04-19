import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as routeConfig from 'src/config/routes';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Box, Container, Button } from '@material-ui/core';
import FabMenu from 'src/components/ui/fab-menu';

import { useCustomGetSelectedHeatQuery } from 'src/gql/custom-hooks/use-custom-get-selected-heat';

import EndHeat from 'src/screens/scoreboard-screens/shared/buttons/end-heat';

import ScreenWrapper from 'src/components/ui/screen-wrapper';
import NoLiveHeats from 'src/screens/scoreboard-screens/shared/no-live-heats';
import RiderRankList from './components/rider-rank-table';
import HeatMetaDataModal from './components/heat-meta-data';

import { parseLongName } from './utils';

const useStyles = makeStyles((theme: Theme) => ({
  topSection: {
    marginTop: -13,
    paddingTop: theme.spacing(4),
    paddingBottom: 0,
    height: 120,
    backgroundImage: 'linear-gradient(#2a6db0, #606CB1)',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 30,
  },

  lineupIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    cursor: 'pointer',
  },
}));

interface IMatchParams {
  eventId: string;
}

type IProps = RouteComponentProps<IMatchParams>;

const ScoreboardOverview: React.FC<IProps> = ({ match, history }) => {
  const classes = useStyles();
  const { eventId } = match.params;
  const [open, setOpen] = useState(false);
  const { data, stopPolling, startPolling } = useCustomGetSelectedHeatQuery({ variables: { id: eventId } });

  useEffect(
    () => {
      startPolling(5000);
      return () => {
        stopPolling();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onInfoBtnClick = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onRedirectEdit = () => history.push(`${routeConfig.ROUTE_LIVE}/${eventId}/edit`);

  // const [title, subTitle] = parseLongName(data?.selectedHeat?.longName) || [null, null];

  const title = data?.selectedHeat?.name;
  const subTitle = data?.selectedHeat?.name;

  return (
    <ScreenWrapper eventTitle='' eventId={eventId} currentPath='live' dense showSpinner={!data}>
      {data && (
        <>
          {!data.selectedHeat && <NoLiveHeats />}
          {data?.selectedHeat && (
            <>
              <Box className={classes.topSection}>
                <Box flexGrow={1}>
                  <Typography variant='h3' align='center' style={{ textTransform: 'uppercase', color: 'white' }}>
                    {title}
                  </Typography>
                  <Typography variant='h4' align='center' style={{ color: 'white', marginTop: 10, textTransform: 'uppercase' }}>
                    {subTitle}
                  </Typography>
                </Box>
                <Box className={classes.infoWrapper}>
                  <Button onClick={onInfoBtnClick} variant='contained' style={{ backgroundColor: 'white' }}>
                    <div className={classes.lineupIcon}>
                      <HelpOutlineIcon fontSize='large' color='primary' />
                      <Typography style={{ fontSize: 12 }}>Infomation</Typography>
                    </div>
                  </Button>
                  <Box>
                    <Grid container alignItems='center' spacing={1} style={{ marginTop: 5 }}>
                      <Grid item>
                        <Typography>Live</Typography>
                      </Grid>
                      <Grid item>
                        <div style={{ height: 10, width: 10, backgroundColor: 'green', borderRadius: '50%' }} />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Container maxWidth='md'>
                <Box mt={8} p={2}>
                  <RiderRankList noProgressing={data.selectedHeat.noProgressing} riderAllocations={data.selectedHeat.riderAllocations.items} />
                </Box>
              </Container>
              {data.selectedHeat.isJudge && (
                <FabMenu>
                  <FabMenu.Item>
                    <EndHeat heat={data.selectedHeat} />
                  </FabMenu.Item>
                  <FabMenu.Item onClick={onRedirectEdit}>
                    <Button>INPUT SCORE</Button>
                  </FabMenu.Item>
                </FabMenu>
              )}
              <HeatMetaDataModal open={open} onClose={onClose} riderAllocations={data.selectedHeat.riderAllocations.items} />
            </>
          )}
        </>
      )}
    </ScreenWrapper>
  );
};

export default ScoreboardOverview;

// return (
//   <ScreenWrapper eventId={eventId} currentPath='live' onlyBottom showSpinner={!data}>
//     {data && (
//       <>
//         {!data.selectedHeat && (
//           <Grid container justify='center' alignItems='center' style={{ height: '100vh' }}>
//             <Grid item>
//               <Typography variant='h6' component='div' color='primary' style={{ textAlign: 'center', lineHeight: 1.2, textTransform: 'none' }}>
//                 There are currently no live heats.
//                 <br />
//                 Check back in a bit!
//               </Typography>
//             </Grid>
//           </Grid>
//         )}
//         {data.selectedHeat && (
//           <Grid container direction='column' justify='center' alignItems='center'>
//             <HeatSummary heat={data.selectedHeat} />
//             {data.selectedHeat.isJudge && (
//               <Grid item>
//                 <EndHeat heat={data.selectedHeat} />
//               </Grid>
//             )}
//             <Grid item style={{ width: '100%' }}>
//               <ScoresTables riderAllocations={data.selectedHeat.riderAllocations.items} eventId={eventId} noProgressing={data.selectedHeat.noProgressing} />
//             </Grid>
//           </Grid>
//         )}
//       </>
//     )}
//   </ScreenWrapper>
// );
