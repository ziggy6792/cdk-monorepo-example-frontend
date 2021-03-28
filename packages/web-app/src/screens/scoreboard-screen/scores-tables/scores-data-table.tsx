/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import _ from 'lodash';
import DataTable, { IDataTableProps, IDataTableRow } from 'src/components/data-table';
import { Grid } from '@material-ui/core';
import ScoreTabs from './score-tabs';

interface ScoresDataTableProps extends Omit<IDataTableProps, 'title'> {
    title?: string;
}

export interface IRiderAllocationRow extends IDataTableRow {
    userId: string;
}

const ScoresDataTable: React.FC<ScoresDataTableProps> = props => (
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
                    <ScoreTabs />
                </Grid>
            ),
        }}
    />
);

export default ScoresDataTable;
