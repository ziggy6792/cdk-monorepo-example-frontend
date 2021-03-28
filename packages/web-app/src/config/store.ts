import { configureStore, combineReducers } from '@reduxjs/toolkit';
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const initStore = (initialState?: IRootState) =>
    configureStore({
        preloadedState: initialState,
        reducer,
    });

export default initStore;
