/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import MUIDataTable from 'mui-datatables';

import _ from 'lodash';
import { Grid } from '@material-ui/core';

import { useHistory } from 'react-router';
import { listEvents_listEvents } from 'src/gql/types/listEvents';

interface EventsTableProps {
    events: listEvents_listEvents[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
    console.log(events);

    const history = useHistory();

    const tableData = events && events.map((val) => [val.name, '06/07/1992', { rowMeta: { id: val.id } }]);

    const columns = [
        {
            name: 'event',
            label: 'Event',
            options: {},
        },
        {
            name: 'date',
            label: 'Date',
            options: {},
        },
    ];

    return (
        <>
            <Grid container direction='column'>
                <Grid item>
                    <MUIDataTable
                        title='Events'
                        data={tableData}
                        columns={columns}
                        options={{
                            onRowClick: (rowData) => {
                                console.log(`clicked`, rowData);
                            },
                        }}
                    />
                </Grid>
                {/* {props.auth.isAuthenticated && (
                    <Grid container direction='row' justify='center' style={{ marginTop: theme.spacing(2) }}>
                        <Grid item>
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                Create Event
                            </Button>
                        </Grid>
                    </Grid>
                )} */}
            </Grid>
        </>
    );
};

export default EventsTable;
