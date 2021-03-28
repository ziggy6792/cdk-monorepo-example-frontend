/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { RiderAllocation, User } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import Tabs from 'src/components/tabs';
import ScoreTabs from './score-tabs';

type RiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId' | 'position' | 'startSeed' | 'startOrder' | 'rankOrder' | 'runs'> & {
    user: Pick<User, 'fullName'>;
};

interface EventsTableProps {
    riderAllocations: RiderAllocationItem[];
}

interface IRiderAllocationRow extends IDataTableRow {
    userId: string;
}

const ScoresTable: React.FC<EventsTableProps> = ({ riderAllocations }) => {
    let noRuns = 0;
    try {
        noRuns = riderAllocations[0].runs.length;
    } catch (err) {
        //   Do nothing
    }

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
        <>
            <DataTable
                title='Scores'
                tableData={startlistTableData}
                columns={startlistTableColumns}
                options={{
                    rowsPerPage: riderAllocations.length,
                    customToolbar: () => (
                        <Grid container>
                            {/* <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tableTabs} /> */}
                            <ScoreTabs />
                        </Grid>
                    ),
                }}
            />
            <DataTable
                title='Scores'
                tableData={scoresTableData}
                columns={scoresTableColumns}
                options={{
                    rowsPerPage: riderAllocations.length,
                    customToolbar: () => (
                        <Grid container>
                            {/* <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tableTabs} /> */}
                            <ScoreTabs />
                        </Grid>
                    ),
                }}
            />
        </>
    );
};

export default ScoresTable;
