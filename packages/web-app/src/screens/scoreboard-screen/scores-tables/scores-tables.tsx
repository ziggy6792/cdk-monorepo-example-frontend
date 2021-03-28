import React from 'react';
import _ from 'lodash';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';
import { useLocation } from 'react-router';
import { RiderAllocationItem } from 'src/gql/common/types';
import { scoresTableTabs, ScoreTableTab } from './score-tabs';
import ScoresDataTable, { IRiderAllocationRow } from './scores-data-table';
import EnterScoresTable from './enter-scores-table';

export interface IScoresTableProps {
    riderAllocations: RiderAllocationItem[];
}

const ScoresTables: React.FC<IScoresTableProps> = ({ riderAllocations }) => {
    const { pathname } = useLocation();

    const [selectedTab] = useTabState({ tabKey: pathname, initialValue: scoresTableTabs[0].value });

    const scoresTableData: IRiderAllocationRow[] = riderAllocations.map(riderAllocation => ({
        userId: riderAllocation.userId,
        rowData: {
            order: riderAllocation.startOrder,
            rider: riderAllocation.user.fullName,
            position: riderAllocation.position,
            ..._.reduce(riderAllocation.runs, (obj, v, i) => ({ ...obj, [`run${i + 1}`]: v.score }), {}),
        },
    }));

    const noOfRuns = riderAllocations[0]?.runs?.length || 0;

    return (
        <>
            {selectedTab === ScoreTableTab.ENTER_SCORES && <EnterScoresTable tableData={scoresTableData} noOfRuns={noOfRuns} />}
            {selectedTab === ScoreTableTab.START_LIST && <StartListTable tableData={scoresTableData} />}
            {selectedTab === ScoreTableTab.RESULTS && <ResultsTable tableData={scoresTableData} noOfRuns={noOfRuns} />}
        </>
    );
};

export interface IStartListTableProps {
    tableData: IRiderAllocationRow[];
}

const StartListTable: React.FC<IStartListTableProps> = ({ tableData }) => {
    const startlistTableColumns = [
        { name: 'order', label: 'Order' },
        { name: 'rider', label: 'Rider' },
    ];

    return <ScoresDataTable tableData={tableData} columns={startlistTableColumns} />;
};

export interface IResultsTableProps {
    tableData: IRiderAllocationRow[];
    noOfRuns?: number;
}

const ResultsTable: React.FC<IResultsTableProps> = ({ tableData, noOfRuns }) => {
    const scoresTableColumns = [
        { name: 'rider', label: 'Rider' },
        ..._.range(noOfRuns).map(v => ({
            name: `run${v + 1}`,
            label: `Run\u00A0${v + 1}`,
        })),
        { name: 'position', label: 'Rank' },
    ];

    return <ScoresDataTable tableData={tableData} columns={scoresTableColumns} />;
};

export default ScoresTables;
