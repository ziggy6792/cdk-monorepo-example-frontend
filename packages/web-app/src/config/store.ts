/* eslint-disable import/no-mutable-exports */
import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from 'src/domain/auth';
import tabsReducer, { TabState } from 'src/domain/tabs';
import errorReducer, { ErrorState } from 'src/domain/error';

export interface IRootState {
  readonly auth: AuthState;
  readonly tabs: TabState;
  readonly error: ErrorState;
}

const reducer = combineReducers<IRootState>({
  auth: authReducer,
  tabs: tabsReducer,
  error: errorReducer,
});

export let store: EnhancedStore<any>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const initStore = (initialState?: IRootState) => {
  store = configureStore({
    preloadedState: initialState,
    reducer,
  });
  return store;
};

export default initStore;
