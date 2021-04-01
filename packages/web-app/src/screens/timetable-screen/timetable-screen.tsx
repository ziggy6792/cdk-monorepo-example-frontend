import { Grid } from '@material-ui/core';
import React from 'react';
import Spinner from 'src/components/spinner';
import { useGetEventScheduleQuery } from 'src/generated-types';
import Timetable from './timetable';

interface IScoreboardScreenProps {
    eventId: string;
}

const TimetableScreen: React.FC<IScoreboardScreenProps> = ({ eventId }) => {
    const { loading, data } = useGetEventScheduleQuery({ variables: { id: eventId } });

    if (loading) {
        return <Spinner />;
    }

    console.log('TimetableScreen', data.getEvent.scheduleItems);
    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <Timetable scheduleItems={data.getEvent.scheduleItems.items} eventId={eventId} />
            </Grid>
        </>
    );
};
export default TimetableScreen;
