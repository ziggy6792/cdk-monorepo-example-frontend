import React from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import LiveIndicator from './live-indicator';

interface StyleProps {
    cardWidth?: number;
    highlightColor?: string;
    cursor?: string;
}

export enum HeatCardStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
}

const useStyles = makeStyles(theme => ({
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
}));

const statusColors = {
    [HeatCardStatus.NOT_STARTED]: '#34495e',
    [HeatCardStatus.IN_PROGRESS]: '#17a2b8',
    [HeatCardStatus.FINISHED]: '#ecf0f1',
};

const statusCursor = {
    [HeatCardStatus.NOT_STARTED]: 'default',
    [HeatCardStatus.IN_PROGRESS]: 'pointer',
    [HeatCardStatus.FINISHED]: 'pointer',
};

interface HeatCardProps {
    title: React.ReactNode;
    content?: React.ReactNode;
    status?: HeatCardStatus;
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
            {status === HeatCardStatus.IN_PROGRESS && <LiveIndicator />}
        </Card>
    );
};

export default HeatCard;
