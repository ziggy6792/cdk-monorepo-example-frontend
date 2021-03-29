import React from 'react';
import _ from 'lodash';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';
import { useLocation } from 'react-router';
import { IRiderAllocationItem } from 'src/gql/common/types';
import { scoreboardTabs, ScoreboardTab } from './scoreboard-tabs';
import ScoreboardDataTable, { IRiderAllocationRow } from './scoreboard-data-table';
import EnterScoresTable from './enter-scores-table';

export interface IScoresTableProps {
    riderAllocations: IRiderAllocationItem[];
    eventId: string;
}

const ScoreboardTables: React.FC<IScoresTableProps> = ({ riderAllocations, eventId }) => {
    const { pathname } = useLocation();

    const [selectedTab] = useTabState({ tabKey: pathname, initialValue: scoreboardTabs[0].value });

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
            {selectedTab === ScoreboardTab.ENTER_SCORES && <EnterScoresTable tableData={scoresTableData} noOfRuns={noOfRuns} eventId={eventId} />}
            {selectedTab === ScoreboardTab.START_LIST && <StartListTable tableData={scoresTableData} />}
            {selectedTab === ScoreboardTab.RESULTS && <ResultsTable tableData={scoresTableData} noOfRuns={noOfRuns} />}
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

    return <ScoreboardDataTable tableData={tableData} columns={startlistTableColumns} />;
};

export interface IResultsTableProps {
    tableData: IRiderAllocationRow[];
    noOfRuns?: number;
}

const ResultsTable: React.FC<IResultsTableProps> = ({ tableData, noOfRuns }) => {
    const scoresTableColumns = [
        { name: 'rankedRider', label: 'Rider' },
        ..._.range(noOfRuns).map(v => ({
            name: `run${v + 1}`,
            label: `Run\u00A0${v + 1}`,
        })),
        { name: 'position', label: 'Rank' },
    ];

    return <ScoreboardDataTable tableData={tableData} columns={scoresTableColumns} />;
};

export default ScoreboardTables;
