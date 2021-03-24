/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, useTheme } from '@material-ui/core';
import { RiderAllocation, User } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import SeedsForm from 'src/modules/seeds-form';
import { RiderOption } from 'src/gql/common/types';

interface IEditSeedsProps {
    riderOptions: RiderOption[];
}

const EditSeeds: React.FC<IEditSeedsProps> = ({ riderOptions }) => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Grid container direction='column'>
                <Grid container direction='row' justify='center' style={{ marginTop: theme.spacing(2) }}>
                    <Grid item>
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Edit Seeds
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <SeedsForm
                        onSubmit={async (values) => console.log('values', values)}
                        title='Edit Seeds'
                        onCancel={() => setOpen(false)}
                        initialValues={{ riders: riderOptions.map(({ userId }) => userId) }}
                        riderOptions={riderOptions}
                    />
                </Dialog>
            </Grid>
        </>
    );
};

export default EditSeeds;
