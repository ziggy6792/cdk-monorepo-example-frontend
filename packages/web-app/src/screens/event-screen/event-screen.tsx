import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useGetEventQuery } from 'src/generated-types';
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

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item>
                    <Typography>
                        Event {name} hosted by {adminName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>{description}</Typography>
                </Grid>
                <Grid container justify='center' alignItems='center'>
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
                </Grid>

                <Grid container>
                    {/* ToDo fix this */}
                    <Grid item style={{ width: '100%' }}>
                        <CompetitionsTable competitions={data.getEvent.competitions.items} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default EventScreen;
