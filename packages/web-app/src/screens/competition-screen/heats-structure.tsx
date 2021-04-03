import React from 'react';
import { Grid, Card, Container, makeStyles, Typography, createStyles } from '@material-ui/core';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import LiveIndicator from './live-indicator';

interface StyleProps {
    cardWidth?: number;
    highlightColor?: string;
    cursor?: string;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        container: { margin: 8 },
        heatCard: (props: StyleProps) => ({
            width: props.cardWidth,
            height: 120,
            borderLeft: `3px solid ${props.highlightColor}`,
            background: `${props.highlightColor}1a`,
            cursor: props.cursor,
            opacity: props.cursor === 'default' && '0.2',
            '&:hover': {
                opacity: 1,
                boxShadow: theme.shadows[5],
            },
        }),
        heatCardTitle: {
            fontSize: '1rem',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            padding: 8,
            textTransform: 'uppercase',
            fontWeight: 900,
            letterSpacing: '2px',
            color: '#111',
        },
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

enum HeatStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
}

const statusColors = {
    [HeatStatus.NOT_STARTED]: '#34495e',
    [HeatStatus.IN_PROGRESS]: '#17a2b8',
    [HeatStatus.FINISHED]: '#ecf0f1',
};

const statusCursor = {
    [HeatStatus.NOT_STARTED]: 'default',
    [HeatStatus.IN_PROGRESS]: 'pointer',
    [HeatStatus.FINISHED]: 'pointer',
};

interface HeatCardProps {
    title: React.ReactNode;
    content?: React.ReactNode;
    status?: HeatStatus;
    width?: number;
}

const HeatCard: React.FC<HeatCardProps> = ({ title = 'Finals', content = '', status, width = 100 }) => {
    const classes = useStyles({
        highlightColor: statusColors[status] || '#ffffffff',
        cursor: statusCursor[status] || 'default',
        cardWidth: width,
    });

    return (
        <Card className={classes.heatCard}>
            <Typography component='div' className={classes.heatCardTitle}>
                {title}
            </Typography>
            <Typography
                style={{
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    lineHeight: 0.9,
                    paddingLeft: 4,
                }}
            >
                {content}
            </Typography>
            {status === 'IN_PROGRESS' && <LiveIndicator />}
        </Card>
    );
};

interface DateHeaderProps {
    header: string;
}

const DateHeader: React.FC<DateHeaderProps> = ({ header }) => {
    const classes = useStyles({});
    return (
        <Typography component='div' className={classes.dateHeader}>
            {header}
        </Typography>
    );
};

const HeatsStructure: React.FC = () => {
    const classes = useStyles({});
    return (
        <Container className={classes.container}>
            <DateHeader header='SATURDAY, AUGUST 8' />
            <Grid container spacing={2} justify='center'>
                <Grid item>
                    <HeatCard
                        title='Heats #1'
                        status={HeatStatus.FINISHED}
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
                    <HeatCard title='Heats #2' status={HeatStatus.FINISHED} />
                </Grid>
                <Grid item>
                    <HeatCard title='Heats #3' status={HeatStatus.IN_PROGRESS} />
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
