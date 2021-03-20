/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import MUIDataTable from 'mui-datatables';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { useHistory } from 'react-router';
import { ListEventsQuery, useCreateEventMutation } from 'src/generated-types';
import { LIST_EVENTS } from 'src/gql/event.gql';
import { parseISO } from 'date-fns';
import DateFormatter from 'src/utils/format/date-formatter';
import DataTable, { IDataTableRow } from 'src/components/data-table';

interface EventsTableProps {
    events: ListEventsQuery['listEvents'];
}

interface IEventRow extends IDataTableRow {
    eventId: string;
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
    console.log(events);

    const history = useHistory();

    const theme = useTheme();

    const tableData: IEventRow[] = events.map(event => ({
        eventId: event.id,
        rowData: {
            name: event.name,
            startTime: { displayText: DateFormatter.toShortDate(event.startTime), sortIndex: event.startTime.getTime() },
        },
    }));

    const columns = [
        {
            name: 'name',
            label: 'Event',
            options: {},
        },
        {
            name: 'startTime',
            label: 'Date',
            options: {},
        },
    ];

    return (
        <DataTable
            title='Events'
            tableData={tableData}
            columns={columns}
            options={{
                onRowClick: (row: IEventRow) => {
                    console.log(`clicked`, row.eventId);
                },
            }}
        />
    );
};

export default EventsTable;
