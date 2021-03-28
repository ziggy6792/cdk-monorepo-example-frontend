/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { RiderAllocation } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';

type RiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId'>;

interface EventsTableProps {
    riderAllocations: RiderAllocationItem[];
}

interface IRiderAllocationRow extends IDataTableRow {
    userId: string;
}

const ScoresTable: React.FC<EventsTableProps> = ({ riderAllocations }) => {
    const tableData: IRiderAllocationRow[] = riderAllocations.map(riderAllocation => ({
        userId: riderAllocation.userId,
        rowData: {
            rider: riderAllocation.userId,
        },
    }));

    const columns = [{ name: 'rider', label: 'Rider' }];

    return <DataTable title='Scores' tableData={tableData} columns={columns} />;
};

export default ScoresTable;
