import React from 'react';

import { Button, Grid, Typography, Container, Box } from '@material-ui/core';
import { useGetEventQuery } from 'src/generated-types';
import TopNavigation from 'src/components/ui/top-navigation';
import Spinner from 'src/components/spinner';
import { useHistory } from 'react-router';
import { ROUTE_SCOREBOARD, ROUTE_TIMETABLE } from 'src/config/routes';
import CompetitionsTable from './competitions-table';
import EditEvent from './buttons/edit-event';
import AddCompetition from './buttons/add-competition';

interface IEventsScreenProps {
    eventId: string;
}

const EventScreen: React.FC<IEventsScreenProps> = ({ eventId }) => {
    const { loading, data } = useGetEventQuery({ variables: { id: eventId } });

    const history = useHistory();

    if (loading) {
        return <Spinner />;
    }

    const {
        name,
        description,
        adminUser: { fullName: adminName },
        startTime,
    } = data.getEvent;

    /* 
    TODO
    - TopNavigation should be made more complex and moved up a layer in UI
    */

    return (
        <>
            <TopNavigation />

            <Container>
                <Grid container direction='column'>
                    <Grid item style={{ marginTop: 20, marginBottom: 15 }}>
                        <Typography variant='h5'>PLACEGHOLDER - BREADCRUMS</Typography>
                    </Grid>
                    <Grid item>
                        {/* <Typography>
                            Event {name} hosted by {adminName}
                        </Typography> */}
                        <Typography align='left' variant='h3'>
                            {name}
                        </Typography>
                        <Typography align='left' variant='h5'>
                            {adminName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: 12 }} variant='body2' color='textPrimary'>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid container justify='center' alignItems='center'>
                        <Grid item>
                            <Button
                                onClick={() => {
                                    history.push(`${ROUTE_SCOREBOARD}/${eventId}`);
                                }}
                            >
                                Scoreboard
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={() => {
                                    history.push(`${ROUTE_TIMETABLE}/${eventId}`);
                                }}
                            >
                                Timetable
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <EditEvent
                                eventToEdit={{
                                    id: eventId,
                                    description,
                                    name,
                                    startTime,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <AddCompetition eventId={eventId} />
                        </Grid>
                    </Grid>

                    <Container maxWidth='lg' style={{ padding: 0 }}>
                        <CompetitionsTable competitions={data.getEvent.competitions.items} />
                    </Container>
                </Grid>
            </Container>
        </>
    );
};

export default EventScreen;
