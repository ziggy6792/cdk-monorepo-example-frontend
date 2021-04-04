/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Heat, User } from 'src/generated-types';
import Summary from 'src/modules/summary/page-summary';

interface IHeatSummaryProps {
    summary: Pick<Heat, 'name'>;
}

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    judgeName: {
        fontWeight: 500,
    },
}));

const HeatSummary: React.FC<IHeatSummaryProps> = ({ summary }) => {
    const classes = useStyles();

    return (
        <Summary name={summary.name}>
            <Typography>bla</Typography>
        </Summary>
    );
};

export default HeatSummary;
