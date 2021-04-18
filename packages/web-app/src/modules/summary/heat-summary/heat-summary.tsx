import { Typography } from '@material-ui/core';
import React from 'react';
import { Heat } from 'src/generated-types';
import Summary from 'src/modules/summary/page-summary';

interface IHeatSummaryProps {
  heat: Pick<Heat, 'name' | 'longName'>;
}

const HeatSummary: React.FC<IHeatSummaryProps> = ({ heat: summary }) => (
  <Summary name={summary.longName}>
    <Typography
      variant='subtitle2'
      color='textSecondary'
      style={{ padding: '8px 0' }}
    >
      TODO Summary
    </Typography>
  </Summary>
);

export default HeatSummary;
