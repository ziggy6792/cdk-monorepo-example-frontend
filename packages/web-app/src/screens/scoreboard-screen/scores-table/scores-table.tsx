import React from 'react';
import { RiderAllocation, User } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';
import { useLocation } from 'react-router';
import ScoreTabs, { scoresTableTabs, ScoreTableTab } from './score-tabs';

type RiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId' | 'position' | 'startSeed' | 'startOrder' | 'rankOrder' | 'runs'> & {
    user: Pick<User, 'fullName'>;
};

interface ScoresTableProps {
    riderAllocations: RiderAllocationItem[];
}

interface IRiderAllocationRow extends IDataTableRow {
    userId: string;
}

const StartListTable: React.FC<ScoresTableProps> = ({ riderAllocations }) => {
    const startlistTableData: IRiderAllocationRow[] = riderAllocations.map(riderAllocation => ({
        userId: riderAllocation.userId,
        rowData: {
            order: riderAllocation.startOrder,
            rider: riderAllocation.user.fullName,
        },
    }));

    const startlistTableColumns = [
        { name: 'order', label: 'Order' },
        { name: 'rider', label: 'Rider' },
    ];

    return (
        <DataTable
            title='Scores'
            tableData={startlistTableData}
            columns={startlistTableColumns}
            options={{
                rowsPerPage: riderAllocations.length,
                customToolbar: () => (
                    <Grid container>
                        <ScoreTabs />
                    </Grid>
                ),
            }}
        />
    );
};

const ResultsTable: React.FC<ScoresTableProps> = ({ riderAllocations }) => {
    let noRuns = 0;
    try {
        noRuns = riderAllocations[0].runs.length;
    } catch (err) {
        //   Do nothing
    }

    const scoresTableData: IRiderAllocationRow[] = riderAllocations.map(riderAllocation => ({
        userId: riderAllocation.userId,
        rowData: {
            position: riderAllocation.position,
            rider: riderAllocation.user.fullName,
            ..._.reduce(riderAllocation.runs, (obj, v, i) => ({ ...obj, [`run${i + 1}`]: v.score }), {}),
        },
    }));

    const scoresTableColumns = [
        { name: 'rider', label: 'Rider' },
        ..._.range(noRuns).map(v => ({
            name: `run${v + 1}`,
            label: `Run\u00A0${v + 1}`,
        })),
        { name: 'position', label: 'Rank' },
    ];

    return (
        <DataTable
            title='Scores'
            tableData={scoresTableData}
            columns={scoresTableColumns}
            options={{
                rowsPerPage: riderAllocations.length,
                customToolbar: () => (
                    <Grid container>
                        <ScoreTabs />
                    </Grid>
                ),
            }}
        />
    );
};

const ScoresTable: React.FC<ScoresTableProps> = ({ riderAllocations }) => {
    const { pathname } = useLocation();

    const [selectedTab] = useTabState({ tabKey: pathname, initialValue: scoresTableTabs[0].value });

    return (
        <>
            {selectedTab === ScoreTableTab.START_LIST && <StartListTable riderAllocations={riderAllocations} />}
            {selectedTab === ScoreTableTab.RESULTS && <ResultsTable riderAllocations={riderAllocations} />}
        </>
    );
};

export default ScoresTable;
