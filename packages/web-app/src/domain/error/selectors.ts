import { IRootState } from 'src/config/store';

const errorSelector = {
  selectError: (state: IRootState): boolean => state.error.isError,
};

export default errorSelector;
