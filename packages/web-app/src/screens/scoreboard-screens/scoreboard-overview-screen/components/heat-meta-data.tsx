import React from 'react';
import Dialog from 'src/components/ui/dialog-base';
import { Typography, Box, Paper, Button } from '@material-ui/core';
import { IRiderAllocationItem } from 'src/gql/common/types';

interface IProps {
  open: boolean;
  onClose: () => void;
  riderAllocations: IRiderAllocationItem[];
}

const HeatMetaDataModal: React.FC<IProps> = ({ open, onClose, riderAllocations }) => (
  <Dialog open={open} onClose={onClose}>
    <Paper>
      <Typography>Infomation</Typography>
      <Typography variant='body1' style={{ textTransform: 'uppercase', fontSize: 16 }}>
        No. of Particpants: {riderAllocations.length}
      </Typography>
      <Typography variant='body1' style={{ textTransform: 'uppercase', fontSize: 16 }}>
        No. of Qualifiers:{' '}
      </Typography>
    </Paper>
    <Typography>Starting Lineup</Typography>
    <Box>
      <ul>
        {riderAllocations.map((rider) => (
          <li key={rider.userId}>{rider.user.fullName}</li>
        ))}
      </ul>
      <Button variant='outlined' color='primary' onClick={onClose}>
        Close
      </Button>
    </Box>
  </Dialog>
);

export default HeatMetaDataModal;
