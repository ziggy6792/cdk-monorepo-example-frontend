import React from 'react';
import { Grid, Container, makeStyles, Typography, createStyles } from '@material-ui/core';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import HeatCard, { HeatCardStatus } from './heat-card';

const useStyles = makeStyles(() =>
    createStyles({
        container: { margin: 8 },
        dateHeader: {
            background: '#17a2b8',
            color: 'white',
            padding: '0 12px',
            margin: '12px 0 8px',
            borderRadius: 20,
            width: 'fit-content',
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '2px',
        },
    })
);

interface DateHeaderProps {
    header: string;
}

const DateHeader: React.FC<DateHeaderProps> = ({ header }) => {
    const classes = useStyles();
    return (
        <Typography component='div' className={classes.dateHeader}>
            {header}
        </Typography>
    );
};

const HeatsStructure: React.FC = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <DateHeader header='SATURDAY, AUGUST 8' />
            <Grid container spacing={2} justify='center'>
                <Grid item>
                    <HeatCard
                        title='Hea
                        ts #1'
                        status={HeatCardStatus.FINISHED}
                        content={
                            <>
                                <li>Jonathan</li>
                                <li>Cyril</li>
                                <li>Lolo</li>
                                <li>Baron</li>
                                <li>Kimmy</li>
                            </>
                        }
                    />
                </Grid>
                <Grid item>
                    <HeatCard title='Heats #2' status={HeatCardStatus.FINISHED} />
                </Grid>
                <Grid item>
                    <HeatCard title='Heats #3' status={HeatCardStatus.IN_PROGRESS} />
                </Grid>
                <Grid item>
                    <HeatCard title='Heats #4' />
                </Grid>
            </Grid>
            <DateHeader header='SUNDAY, AUGUST 9' />
            <Grid container spacing={2} justify='center'>
                <Grid item>
                    <HeatCard title='LCQ #1' />
                </Grid>
                <Grid item>
                    <HeatCard title='LCQ #2' />
                </Grid>
            </Grid>
            <Grid container spacing={2} justify='center'>
                <Grid item>
                    <HeatCard title='Semi #1' width={120} />
                </Grid>
                <Grid item>
                    <HeatCard title='Semi #2' width={120} />
                </Grid>
            </Grid>
            <Grid container spacing={1} justify='center' style={{ paddingTop: 8 }}>
                <Grid item>
                    <HeatCard
                        title={
                            <>
                                <TrophyIcon style={{ color: '#f1c40f' }} />
                                Finals
                            </>
                        }
                        width={260}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeatsStructure;
