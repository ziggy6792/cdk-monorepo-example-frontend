import { IRootState } from 'src/conf/store';
import IUser from './user';

export const selectUser = (state: IRootState): IUser | null => state.auth.user;

export const selectIsAuthenticated = (state: IRootState): boolean => state.auth.user && !state.auth.user.isGuest;

export const selectIsLoading = (state: IRootState): boolean => state.auth.isLoading;
