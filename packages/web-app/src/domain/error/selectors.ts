import { ErrorResponse } from '@apollo/client/link/error';
import { IRootState } from 'src/config/store';

const errorSelector = {
  selectApiError: (state: IRootState): ErrorResponse => state.error.apiError,
};

export default errorSelector;
