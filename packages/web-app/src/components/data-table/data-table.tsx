/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import MUIDataTable, { MUIDataTableProps, MUIDataTableColumn } from 'mui-datatables';

import _ from 'lodash';
import { IDataTableRow } from './types';

const defaultOptions = {
  filterType: 'dropdown',
  rowsPerPageOptions: [],
  rowsPerPage: 5,
  download: false,
  print: false,
  responsive: 'standard',
  selectableRows: 'none',
  rowHover: true,
} as MUIDataTableProps['options'];

export interface IMUIDataTableProps extends Omit<MUIDataTableProps['options'], 'onRowClick'> {
  onRowClick?: (tableRow: IDataTableRow) => void;
}

export interface IDataTableProps extends Omit<MUIDataTableProps, 'data' | 'options'> {
  tableData: IDataTableRow[];
  options?: IMUIDataTableProps;
  columns: MUIDataTableColumn[];
}

const getSortRet = (value, order) => {
  const defaultSortIndex = 0;

  if (value) {
    return value;
  }
  if (order === 'asc') {
    const ret = Number.MAX_SAFE_INTEGER - defaultSortIndex;
    return ret;
  }
  if (order === 'desc') {
    const ret = Number.MIN_SAFE_INTEGER + defaultSortIndex;
    return ret;
  }
  return null;
};

const DataTable: React.FC<IDataTableProps> = (props) => {
  const { tableData: tableRows, ...rest } = props;

  const tableDisplayData = [];

  tableRows.forEach(({ rowData: cellData }) => {
    const cellDisplayData = {};

    Object.keys(cellData).forEach((key) => {
      const value = cellData[key];

      if (typeof value === 'string') {
        cellDisplayData[key] = value;
      } else if (typeof value === 'number') {
        cellDisplayData[key] = value;
      } else if (typeof value === 'object' && value?.displayText) {
        cellDisplayData[key] = value.displayText;
      }
      // If cell is empty then add empty char to stop row being shrunk
      if (!cellDisplayData[key]) {
        cellDisplayData[key] = '\u00A0';
      }
    });
    tableDisplayData.push(cellDisplayData);
  });

  const customSort = (dataToSort: any[], colIndex: number, order: 'desc' | 'asc'): any[] => {
    const reverse = false;

    const retData = _.orderBy(
      dataToSort,
      (item) => {
        const columKey = (props.columns[colIndex] as MUIDataTableColumn).name;
        const origCellData = tableRows[item.index].rowData[columKey];

        const sortIndex = typeof origCellData === 'object' ? origCellData?.sortIndex : origCellData;

        const val = getSortRet(sortIndex, order);
        return val;
      },
      order
    );
    return reverse ? retData.reverse() : retData;
  };

  return (
    <MUIDataTable
      {...props}
      options={{
        ...defaultOptions,
        ...props.options,
        customSort,
        onRowClick: props.options?.onRowClick
          ? (rowData, rowMeta) => {
              const { dataIndex } = rowMeta;
              props.options.onRowClick(tableRows[dataIndex]);
            }
          : undefined,
      }}
      data={tableDisplayData}
    />
  );
};

export default DataTable;
