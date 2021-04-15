/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DataTable, { IDataTableProps, IDataTableRow } from 'src/components/data-table';
import { Grid, makeStyles } from '@material-ui/core';
import { IRiderAllocationItem } from 'src/gql/common/types';
import clsx from 'clsx';

interface ScoresDataTableProps extends Omit<IDataTableProps, 'title'> {
  title?: string;
  highlightedPositions?: number;
}

export interface IRiderAllocationRow extends IDataTableRow {
  riderAllocation: IRiderAllocationItem;
}

const useStyles = makeStyles((theme) => ({
  highlight: {
    '& td': {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
    },
  },
}));

const ResultsDataTable: React.FC<ScoresDataTableProps> = (props) => {
  const classes = useStyles();
  const { highlightedPositions, tableData, title } = props;

  return (
    <DataTable
      {...props}
      title={title}
      options={{
        ...props.options,
        rowsPerPage: undefined,
        pagination: false,
        filter: false,
        viewColumns: false,
        search: false,

        setRowProps: highlightedPositions
          ? (row, dataIndex) => {
              const riderAllocationRow = tableData[dataIndex] as IRiderAllocationRow;
              return {
                className: clsx({
                  [classes.highlight]: riderAllocationRow.riderAllocation.position && riderAllocationRow.riderAllocation.position <= highlightedPositions,
                }),
              };
            }
          : undefined,
      }}
    />
  );
};

export default ResultsDataTable;
