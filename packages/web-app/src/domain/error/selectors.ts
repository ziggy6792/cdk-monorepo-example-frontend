import { IRootState } from 'src/config/store';
import { IError } from './error';

const errorSelector = {
  selectErrors: (state: IRootState): IError[] | null => (state.error.errors?.length > 0 ? state.error.errors : null),
};

export default errorSelector;
