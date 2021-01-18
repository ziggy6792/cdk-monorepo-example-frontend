import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer, { AuthState } from 'src/domain/auth';

export interface IRootState {
    readonly auth: AuthState;
}

const reducer = combineReducers<IRootState>({
    auth: authReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const initStore = (initialState?: IRootState) =>
    configureStore({
        preloadedState: initialState,
        reducer,
    });

export default initStore;
