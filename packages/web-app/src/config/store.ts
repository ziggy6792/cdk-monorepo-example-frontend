import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer, { AuthState } from 'src/domain/auth';

export interface IRootState {
  readonly auth: AuthState;
}

const reducer = combineReducers<IRootState>({
  auth: authReducer,
});

export default configureStore({
  reducer,
});
