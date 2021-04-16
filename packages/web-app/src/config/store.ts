/* eslint-disable import/no-mutable-exports */
import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from 'src/domain/auth';
import tabsReducer, { TabState } from 'src/domain/tabs/tabs';

export interface IRootState {
  readonly auth: AuthState;
  readonly tabs: TabState;
}

const reducer = combineReducers<IRootState>({
  auth: authReducer,
  tabs: tabsReducer,
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
