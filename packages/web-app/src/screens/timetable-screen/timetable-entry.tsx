/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { TimetableRound, TimetableScheduleItem } from 'src/gql/common/types';

interface TimetableEntryProps {
    scheduleItem: TimetableScheduleItem;
}

const TimetableEntry: React.FC<TimetableEntryProps> = ({ scheduleItem }) => {
    const { notice, scheduledItem } = scheduleItem;
    return (
        <>
            {scheduledItem?.__typename === 'Round' && <TimetableRoundEntry round={scheduledItem} />}
            {notice && <TimetableNoticeEntry notice={notice} />}
        </>
    );
};

interface TimetableNoticeEntryProps {
    notice: string;
}

const TimetableNoticeEntry: React.FC<TimetableNoticeEntryProps> = ({ notice }) => (
    <>
        <Grid item>{notice}</Grid>
    </>
);

interface TimetableRoundEntryProps {
    round: TimetableRound;
}

const TimetableRoundEntry: React.FC<TimetableRoundEntryProps> = ({ round }) => {
    const theme = useTheme();

    return (
        <>
            <Grid item>{round.name}</Grid>
            <Grid container direction='row' spacing={2} style={{ marginLeft: theme.spacing(1) }}>
                {round.heats.items.map(heat => (
                    <Grid item key={heat.name}>
                        {heat.name}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default TimetableEntry;
