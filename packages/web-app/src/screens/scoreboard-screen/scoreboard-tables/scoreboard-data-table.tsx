/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DataTable, { IDataTableProps, IDataTableRow } from 'src/components/data-table';
import { Grid } from '@material-ui/core';
import { IRiderAllocationItem } from 'src/gql/common/types';
import ScoreboardTabs from './scoreboard-tabs';

interface ScoresDataTableProps extends Omit<IDataTableProps, 'title'> {
    title?: string;
}

export interface IRiderAllocationRow extends IDataTableRow {
    riderAllocation: IRiderAllocationItem;
}

const ScoreboardDataTable: React.FC<ScoresDataTableProps> = (props) => (
    <DataTable
        {...props}
        title='Scores'
        options={{
            ...props.options,
            rowsPerPage: undefined,
            pagination: false,
            filter: false,
            viewColumns: false,
            search: false,
            customToolbar: () => (
                <Grid container>
                    <ScoreboardTabs />
                </Grid>
            ),
        }}
    />
);

export default ScoreboardDataTable;
