import { IRootState } from 'src/config/store';
import IUser from './user';

const authSelectors = {
  selectUser: (state: IRootState): IUser | null => state.auth.user,
  selectIsAuthenticated: (state: IRootState): boolean => !!state.auth.user,
  selectIsLoading: (state: IRootState): boolean => state.auth.isLoading,
};

export default authSelectors;
