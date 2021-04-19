import React from 'react';

import { Typography, Box, Card, CardContent, Button } from '@material-ui/core';
import { AirlineSeatReclineExtra } from '@material-ui/icons';

import Dialog from 'src/components/ui/dialog-base';
import { IRiderAllocationItem } from 'src/gql/common/types';

interface IProps {
  open: boolean;
  onClose: () => void;
  riderAllocations: IRiderAllocationItem[];
}

const HeatMetaDataModal: React.FC<IProps> = ({ open, onClose, riderAllocations }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
    <Typography variant='h4'>Information</Typography>
    <div
      style={{
        background: '#eee',
        margin: '8px 0',
        borderRadius: '8px',
        padding: '8px',
      }}
    >
      <Typography variant='subtitle2' color='textPrimary' style={{ fontSize: 16 }}>
        {riderAllocations.length} total participants
      </Typography>
      {/* <Typography variant='subtitle2' color='textPrimary' style={{ fontSize: 16 }}>
        4 qualifiers # TODO
      </Typography> */}
    </div>
    <br />
    <Typography variant='h4' style={{ paddingBottom: 8 }}>Starting Lineup</Typography>
    {riderAllocations.map((rider) => (
      <Typography variant='h6' color='textPrimary' key={rider.userId} style={{ lineHeight: 1.2}}>
        - {rider.user.fullName}
      </Typography>
    ))}
    <br />
    <Button startIcon={<AirlineSeatReclineExtra />} variant='contained' color='primary' onClick={onClose}>
      Send it!
    </Button>
  </Dialog>
);

export default HeatMetaDataModal;
