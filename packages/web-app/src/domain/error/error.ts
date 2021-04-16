import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ErrorState = { isError: boolean };

interface IErrorAction {
  error: any;
}

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    isError: false,
  },
  reducers: {
    setError: (state, action: PayloadAction<IErrorAction>) => {
      console.log('errorSlice setError');
      state.isError = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError: errorActionCreator } = errorSlice.actions;

const errorReducer = errorSlice.reducer;

export default errorReducer;
