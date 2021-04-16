import { ErrorResponse } from '@apollo/client/link/error';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ErrorState = { apiError: ErrorResponse };

interface IErrorAction {
  apiError: ErrorResponse;
}

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    apiError: null,
  },
  reducers: {
    setError: (state, action: PayloadAction<IErrorAction>) => {
      state.apiError = action.payload.apiError;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError: errorActionCreator } = errorSlice.actions;

const errorReducer = errorSlice.reducer;

export default errorReducer;
