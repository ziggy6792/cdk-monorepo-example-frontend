import React from 'react';
import _ from 'lodash';
import { IRiderAllocationItem } from 'src/gql/common/types';
import ResultsDataTable, { IRiderAllocationRow } from './results-data-table';

export enum ScoresTableType {
    START_LIST = 'START_LIST',
    RESULTS = 'RESULTS',
}

export interface IScoresTableProps {
    riderAllocations: IRiderAllocationItem[];
    noProgressing: number;
    tableType?: ScoresTableType;
}

const ScoresTables: React.FC<IScoresTableProps> = ({ riderAllocations, noProgressing, tableType = ScoresTableType.RESULTS }) => {
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
            {tableType === ScoresTableType.RESULTS && <StartListTable tableData={scoresTableData} noProgressing={noProgressing} />}

            {tableType === ScoresTableType.START_LIST && <ResultsTable tableData={scoresTableData} noOfRuns={noOfRuns} noProgressing={noProgressing} />}
        </>
    );
};

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

    return <ResultsDataTable title='Results' tableData={tableData} columns={scoresTableColumns} highlightedPositions={noProgressing} />;
};

export interface IStartListTableProps {
    noProgressing: number;
    tableData: IRiderAllocationRow[];
}

const StartListTable: React.FC<IStartListTableProps> = ({ tableData, noProgressing }) => {
    const startlistTableColumns = [
        { name: 'order', label: 'Order' },
        { name: 'rider', label: 'Rider' },
    ];

    return (
        <ResultsDataTable
            title='Start List'
            tableData={_.orderBy(tableData, row => row.riderAllocation.startOrder)}
            columns={startlistTableColumns}
            highlightedPositions={noProgressing}
        />
    );
};

export default ScoresTables;
