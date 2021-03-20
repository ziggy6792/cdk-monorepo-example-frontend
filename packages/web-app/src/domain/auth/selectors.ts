import { IRootState } from 'src/config/store';
import IUser from './user';

export const selectUser = (state: IRootState): IUser | null => state.auth.user;

export const selectIsAuthenticated = (state: IRootState): boolean => !!state.auth.user;

export const selectIsLoading = (state: IRootState): boolean => state.auth.isLoading;

export const selectError = (state: IRootState): any => state.auth.error;
