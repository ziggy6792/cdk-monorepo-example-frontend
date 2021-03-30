/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DataTable, { IDataTableProps, IDataTableRow } from 'src/components/data-table';
import { Grid, makeStyles } from '@material-ui/core';
import { IRiderAllocationItem } from 'src/gql/common/types';
import clsx from 'clsx';
import ScoreboardTabs from './scoreboard-tabs';

interface ScoresDataTableProps extends Omit<IDataTableProps, 'title'> {
    title?: string;
    // dividerLine?: number;
    // isRowHighlighted?: (row: IDataTableRow) => boolean;
    highlightedProgressors?: number;
}

export interface IRiderAllocationRow extends IDataTableRow {
    riderAllocation: IRiderAllocationItem;
}

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    BusinessAnalystRow: {
        '& td': { backgroundColor: '#FAA' },
    },
    GreyLine: {
        '& td': { backgroundColor: theme.palette.grey[200] },
    },
    DividerLine: {
        '& td': {
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            backgroundColor: theme.palette.primary.dark,
            color: 'white',
        },
    },
    Bold: {
        '& td': { fontWeight: 900 },
    },
    BoldCell: {
        fontWeight: 900,
    },
}));

const ScoreboardDataTable: React.FC<ScoresDataTableProps> = props => {
    const classes = useStyles();
    const { highlightedProgressors, tableData } = props;

    return (
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
                setRowProps: highlightedProgressors
                    ? (row, dataIndex, rowIndex) => ({
                          className: clsx({
                              [classes.DividerLine]: (tableData[dataIndex] as IRiderAllocationRow).riderAllocation.position <= highlightedProgressors,
                          }),
                      })
                    : undefined,
            }}
        />
    );
};

export default ScoreboardDataTable;
