import _ from 'lodash';

export const numberColumnOptions = (textAlign = 'right') => ({
    setCellProps: (value, rowIndex) => ({
        // className: classes.Number,
        style: {
            textAlign,
            maxWidth: textAlign === 'right' ? '2em' : textAlign === 'center' ? '2em' : undefined,
        },
    }),
});

export const showHideCollumnOptions = isVisible => ({
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

export const getRowMeta = rowData => (rowData && rowData.length > 0 && rowData[rowData.length - 1] ? rowData[rowData.length - 1].rowMeta : undefined);

export const getRowMetaAttribute = (rowData, attributeName) => {
    const rowMeta = getRowMeta(rowData);
    return rowMeta ? rowMeta[attributeName] : undefined;
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

export const customSort = (data, colIndex, order) => {
    let reverse = false;

    const retData = _.orderBy(
        data,
        item => {
            const { data: rowData } = item as any;
            const rowMeta = getRowMeta(rowData);
            const val = getSortRet(rowData[colIndex], order, rowMeta);
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
    return reverse ? retData.reverse() : retData;
};
