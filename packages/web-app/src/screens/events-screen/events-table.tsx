/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';

import _ from 'lodash';
import { useTheme } from '@material-ui/core';

import { useHistory } from 'react-router';
import { ListEventsQuery } from 'src/generated-types';
import DateFormatter from 'src/utils/format/date-formatter';
import DataTable, { IDataTableRow } from 'src/components/data-table';
import { ROUTE_EVENT } from 'src/config/routes';

interface EventsTableProps {
  events: ListEventsQuery['listEvents'];
}

interface IEventRow extends IDataTableRow {
  eventId: string;
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  const history = useHistory();

  const tableData: IEventRow[] = events.map((event) => ({
    eventId: event.id,
    rowData: {
      name: event.name,
      startTime: { displayText: DateFormatter.toLongDate(event.startTime), sortIndex: event.startTime.getTime() },
    },
  }));

  const columns = [
    {
      name: 'name',
      label: 'Event',
    },
    {
      name: 'startTime',
      label: 'Date',
    },
  ];

  return (
    <DataTable
      title='Events'
      tableData={tableData}
      columns={columns}
      options={{
        onRowClick: (row: IEventRow) => {
          history.push(`${ROUTE_EVENT}/${row.eventId}`);
        },
      }}
    />
  );
};

export default EventsTable;
