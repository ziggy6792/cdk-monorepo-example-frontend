/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { RiderAllocation, User } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';

type RierAllocationItem = Pick<RiderAllocation, 'startSeed'> & {
  user?: Pick<User, 'fullName'>;
};

interface RiderAllocationsTableProps {
  rierAllocations: RierAllocationItem[];
}

const RiderAllocationsTable: React.FC<RiderAllocationsTableProps> = ({ rierAllocations }) => {
  const tableData: IDataTableRow[] = rierAllocations.map((riderAllocation) => ({
    rowData: {
      rider: riderAllocation.user?.fullName,
      seed: riderAllocation.startSeed,
    },
  }));

  const columns = [
    { name: 'rider', label: 'Rider' },
    { name: 'seed', label: 'Seed' },
  ];

  return (
    <DataTable
      title='Registered Riders'
      tableData={tableData}
      columns={columns}
      options={{
        sortOrder: {
          name: 'seed',
          direction: 'asc',
        },
      }}
    />
  );
};

export default RiderAllocationsTable;
