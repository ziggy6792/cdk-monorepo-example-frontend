/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { useHistory } from 'react-router';
import { Heat, Round } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';
import { ROUTE_HEAT } from 'src/config/routes';

type HeatItem = Pick<Heat, 'id' | 'name' | 'size' | 'noAllocated'> & {
    round: Pick<Round, 'roundNo'>;
};

interface EventsTableProps {
    heats: HeatItem[];
}

interface IHeatRow extends IDataTableRow {
    heatId: string;
}

const HeatsTable: React.FC<EventsTableProps> = ({ heats }) => {
    const history = useHistory();

    const tableData: IHeatRow[] = heats.map(heat => ({
        heatId: heat.id,
        rowData: {
            name: heat.name,
            round: heat.round.roundNo,
            size: heat.size,
            allocated: heat.noAllocated,
        },
    }));

    const columns = [
        { name: 'round', label: 'Round' },
        { name: 'name', label: 'Heat' },
        { name: 'size', label: 'Size' },
        { name: 'allocated', label: 'Allocated' },
    ];

    return (
        <DataTable
            title='Heats'
            tableData={tableData}
            columns={columns}
            options={{
                onRowClick: (row: IHeatRow) => {
                    history.push(`${ROUTE_HEAT}/${row.heatId}`);
                },
            }}
        />
    );
};

export default HeatsTable;
