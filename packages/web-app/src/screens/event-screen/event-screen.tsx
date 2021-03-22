import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useGetEventQuery, UpdateEventInput } from 'src/generated-types';
import Spinner from 'src/components/spinner';
import CompetitionsTable from './competitions-table';
import EditEvent from './edit-event';

interface IEventsScreenProps {
    eventId: string;
}

const EventScreen: React.FC<IEventsScreenProps> = ({ eventId }) => {
    const { loading, data } = useGetEventQuery({ variables: { id: eventId } });

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
