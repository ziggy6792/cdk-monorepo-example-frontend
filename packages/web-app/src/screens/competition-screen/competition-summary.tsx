/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Competition, User } from 'src/generated-types';

type CompSummary = Pick<Competition, 'name' | 'description'> & {
    judgeUser: Pick<User, 'fullName'>;
};

interface CompetitionSummaryProps {
    summary: CompSummary;
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    judgeName: {
        fontWeight: 500,
    },
}));

const CompetitionSummary: React.FC<CompetitionSummaryProps> = ({ summary }) => {
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={3} style={{ padding: 16 }}>
                <Grid item>
                    <Typography variant='h4'>{summary.name}</Typography>
                    <Typography>
                        judged by <span className={classes.judgeName}>{summary.judgeUser?.fullName}</span>
                    </Typography>
                </Grid>
                <Grid item />
            </Grid>
            {summary.description && (
                <Grid container style={{ padding: 16 }}>
                    <Grid item>
                        <Typography
                            style={{
                                fontSize: '1rem',
                                margin: '0 30px',
                                background: '#eee',
                                padding: '2px 8px',
                                borderRadius: '8px',
                            }}
                        >
                            {/* {description} TODO */}
                            {summary.description}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default CompetitionSummary;
