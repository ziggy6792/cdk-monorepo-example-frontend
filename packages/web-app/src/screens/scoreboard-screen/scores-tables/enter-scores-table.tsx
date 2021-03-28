import React from 'react';
import _ from 'lodash';
import ScoresDataTable, { IRiderAllocationRow } from './scores-data-table';

export interface IEnterScoresTableProps {
    tableData: IRiderAllocationRow[];
    noOfRuns?: number;
}

const EnterScoresTable: React.FC<IEnterScoresTableProps> = ({ tableData, noOfRuns }) => {
    const scoresTableColumns = [
        { name: 'order', label: 'Order' },
        { name: 'rider', label: 'Rider' },
        ..._.range(noOfRuns).map(v => ({
            name: `run${v + 1}`,
            label: `Run\u00A0${v + 1}`,
        })),
        { name: 'position', label: 'Rank' },
    ];

    return (
        <ScoresDataTable
            tableData={tableData}
            columns={scoresTableColumns}
            options={{
                onRowClick: (rowData: IRiderAllocationRow) => {
                    console.log(`Clicked ${rowData.userId}`);
                },
            }}
        />
    );
};

export default EnterScoresTable;
