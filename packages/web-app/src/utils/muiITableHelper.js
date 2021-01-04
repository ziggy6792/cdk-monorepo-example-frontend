import _ from 'lodash';
import { UPDATE_TABLE_PROPS } from '../graphql/local-mutations';
import { GET_TABLE_PROPS } from '../graphql/local-queries';

export const numberColumnOptions = (textAlign = 'right') => ({
  setCellProps: (value, rowIndex) => ({
    // className: classes.Number,
    style: {
      textAlign,
      maxWidth: textAlign === 'right' ? '2em' : textAlign === 'center' ? '2em' : undefined,
    },
  }),
});

export const showHideCollumnOptions = (isVisible) => ({
  display: isVisible,
  viewColumns: isVisible,
  filter: isVisible,
});

export const rowMetaColumn = {
  name: 'rowMeta',
  options: {
    ...showHideCollumnOptions(false),
  },
};

export const getRowMeta = (rowData) => (rowData && rowData.length > 0 && rowData[rowData.length - 1] ? rowData[rowData.length - 1].rowMeta : undefined);

export const getRowMetaAttribute = (rowData, attributeName) => {
  const rowMeta = getRowMeta(rowData);
  return rowMeta ? rowMeta[attributeName] : undefined;
};

export const getPropsFromApollo = (client, tableName, columns) => ({
  ...getTableProps(client, tableName),
  customSort: customSortApollo(client, tableName, columns),
});

const getTableProps = (client, tableName) => {
  let response;
  let tableProps = {};
  try {
    response = client.readQuery({ query: GET_TABLE_PROPS, variables: { id: tableName } });
    tableProps = response.getTableProps.props;
  } catch (err) {
    return null;
  }
  return tableProps;
};

const customSortApollo = (client, tableName, columns) => (data, colIndex, order) => {
  let oldTableProps;
  try {
    const response = client.readQuery({ query: GET_TABLE_PROPS, variables: { id: tableName } });
    oldTableProps = response && response.getTableProps && response.getTableProps.props;
  } catch (err) {
    // return null;
  }
  const newProps = { sortOrder: { name: columns[colIndex].name || columns[colIndex], direction: order } };

  if (!_.isEqual(oldTableProps, newProps)) {
    client.mutate({ mutation: UPDATE_TABLE_PROPS, variables: { id: tableName, props: newProps } });
  }

  return customSort(data, colIndex, order);
};

const getSortRet = (value, order, rowMeta) => {
  // console.log("data", rowData)
  // console.log("colIndex", colIndex)
  const defaultSortIndex = rowMeta ? rowMeta.defaultSortIndex : 0;

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

export const customSort = (_data, colIndex, order) => {
  let reverse = false;

  const data = _.orderBy(
    _data,
    (item) => {
      const { data: rowData } = item;
      const rowMeta = getRowMeta(rowData);
      const val = getSortRet(rowData[colIndex], order, rowMeta);
      // console.log("customSort rowData", data)
      if (rowMeta) {
        if (rowMeta.colMatas) {
          const selectedColumn = _.find(rowMeta.colMatas, { colIndex });
          if (selectedColumn && selectedColumn.colMeta) {
            reverse = selectedColumn.colMeta.reverseSort;
            return getSortRet(selectedColumn.colMeta.sortIndex, order, rowMeta);
          }
        }
      }
      return val;
    },
    order
  );
  return reverse ? data.reverse() : data;
};
