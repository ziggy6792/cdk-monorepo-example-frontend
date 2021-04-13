export interface ICallMeta {
  sortIndex?: any;
  displayText: string;
}

export interface IDataTableRow {
  // rowMetaData: IRowMeta;
  rowData: { [key in string]: ICallMeta | string | number };
}
