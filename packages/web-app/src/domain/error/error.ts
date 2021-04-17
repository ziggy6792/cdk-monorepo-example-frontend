import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

export type ErrorState = { errors: IError[] };

interface IErrorAction {
  errors: IError[];
}

export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
}

export interface IError {
  type: ErrorType;
  displayText: string;
}

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    errors: [],
  } as ErrorState,
  reducers: {
    setErrors: (state, action: PayloadAction<IErrorAction>) => {
      state.errors = _.concat(state.errors, action.payload.errors);
    },
    clearErrors: (state) => {
      state.errors = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setErrors: setErrorsActionCreator, clearErrors: clearErrorsActionCreator } = errorSlice.actions;

const errorReducer = errorSlice.reducer;

export default errorReducer;
