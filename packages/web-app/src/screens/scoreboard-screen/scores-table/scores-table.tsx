import React from 'react';
import { RiderAllocation, User } from 'src/generated-types';
import { IDataTableRow } from 'src/components/data-table';
import _ from 'lodash';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';
import { useLocation } from 'react-router';
import { scoresTableTabs, ScoreTableTab } from './score-tabs';
import ScoresDataTable from './scores-data-table';

type RiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId' | 'position' | 'startSeed' | 'startOrder' | 'rankOrder' | 'runs'> & {
    user: Pick<User, 'fullName'>;
};

interface IScoresTableProps {
    riderAllocations: RiderAllocationItem[];
}

interface IRiderAllocationRow extends IDataTableRow {
    userId: string;
}

interface IScoresTableDataProps {
    tableData: IRiderAllocationRow[];
    noOfRuns?: number;
}

const StartListTable: React.FC<IScoresTableDataProps> = ({ tableData }) => {
    const startlistTableColumns = [
        { name: 'order', label: 'Order' },
        { name: 'rider', label: 'Rider' },
    ];

    return <ScoresDataTable tableData={tableData} columns={startlistTableColumns} />;
};

const ResultsTable: React.FC<IScoresTableDataProps> = ({ tableData, noOfRuns }) => {
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

const EnterScoresTable: React.FC<IScoresTableDataProps> = ({ tableData, noOfRuns }) => {
    const scoresTableColumns = [
        { name: 'order', label: 'Order' },
        { name: 'rider', label: 'Rider' },
        ..._.range(noOfRuns).map(v => ({
            name: `run${v + 1}`,
            label: `Run\u00A0${v + 1}`,
        })),
        { name: 'position', label: 'Rank' },
    ];

    return <ScoresDataTable tableData={tableData} columns={scoresTableColumns} />;
};

const ScoresTable: React.FC<IScoresTableProps> = ({ riderAllocations }) => {
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

export default ScoresTable;
