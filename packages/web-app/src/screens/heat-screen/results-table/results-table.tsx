import React from 'react';
import _ from 'lodash';
import { IRiderAllocationItem } from 'src/gql/common/types';
import ResultsDataTable, { IRiderAllocationRow } from './results-data-table';

export interface IScoresTableProps {
    riderAllocations: IRiderAllocationItem[];
    noProgressing: number;
    eventId: string;
}

const ScoreboardTables: React.FC<IScoresTableProps> = ({ riderAllocations, eventId, noProgressing }) => {
    const scoresTableData: IRiderAllocationRow[] = riderAllocations.map(riderAllocation => ({
        riderAllocation,
        rowData: {
            order: riderAllocation.startOrder,
            rider: riderAllocation.user.fullName,
            rankedRider: riderAllocation.position ? riderAllocation.user.fullName : null,
            position: riderAllocation.position,
            ..._.reduce(riderAllocation.runs, (obj, v, i) => ({ ...obj, [`run${i + 1}`]: v.score }), {}),
        },
    }));

    const noOfRuns = riderAllocations[0]?.runs?.length || 0;

    return (
        <>
            <ResultsTable tableData={scoresTableData} noOfRuns={noOfRuns} noProgressing={noProgressing} />
        </>
    );
};

export interface IStartListTableProps {
    noProgressing: number;
    tableData: IRiderAllocationRow[];
}

export interface IResultsTableProps {
    tableData: IRiderAllocationRow[];
    noProgressing: number;
    noOfRuns?: number;
}

const ResultsTable: React.FC<IResultsTableProps> = ({ tableData, noOfRuns, noProgressing }) => {
    const scoresTableColumns = [
        { name: 'rankedRider', label: 'Rider' },
        ..._.range(noOfRuns).map(v => ({
            name: `run${v + 1}`,
            label: `Run\u00A0${v + 1}`,
        })),
        { name: 'position', label: 'Rank' },
    ];

    return <ResultsDataTable tableData={tableData} columns={scoresTableColumns} highlightedPositions={noProgressing} />;
};

export default ScoreboardTables;
