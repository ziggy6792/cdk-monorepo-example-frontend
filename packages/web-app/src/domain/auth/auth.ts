/* eslint-disable no-case-declarations */
import { CognitoHostedUIIdentityProvider, CognitoUser } from '@aws-amplify/auth';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import IUser, { mapInUser, USER_TYPE } from './user';

interface ILoginParamsEmail {
  type: USER_TYPE.EMAIL;
  email: string;
  password: string;
}

interface ILoginParamsFacebook {
  type: USER_TYPE.FACEBOOK;
}

type ILoginParams = ILoginParamsEmail | ILoginParamsFacebook;

export interface AuthState {
  isLoading: boolean;
  error: SerializedError | string;
  user: IUser | null;
}

const saveToStorage = (user: IUser) => {
  localStorage.setItem('User', JSON.stringify(user));
};

const cleatStorage = () => {
  localStorage.removeItem('User');
};

const login = createAsyncThunk<
  // Return type of the payload creator
  IUser | USER_TYPE.FACEBOOK,
  // First argument to the payload creator
  ILoginParams
  // Types for ThunkAPI
>('auth/login', async (payload) => {
  let cognitoUser: CognitoUser;

  let userPayload: IUser | USER_TYPE.FACEBOOK;

  switch (payload.type) {
    case USER_TYPE.EMAIL:
      cognitoUser = await Auth.signIn(payload.email, payload.password);
      userPayload = mapInUser(cognitoUser);
      saveToStorage(userPayload as IUser);
      break;
    case USER_TYPE.FACEBOOK:
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
      userPayload = USER_TYPE.FACEBOOK;
      break;
    default:
      throw new Error('Not regognized');
  }

  return userPayload;
});

const logout = createAsyncThunk<
  // Return type of the payload creator
  IUser
>('auth/logout', async () => {
  // First argument to the payload creator
  await Auth.signOut();
  cleatStorage();
  return null;
});

const isAuthenticated = createAsyncThunk<
  // Return type of the payload creator
  IUser
>('auth/isAuthenticatd', async () => {
  let cognitoUser: CognitoUser = null;
  try {
    cognitoUser = await Auth.currentAuthenticatedUser();
  } catch (err) {
    if (err === 'The user is not authenticated') {
      // Do nothing
    } else {
      throw err;
    }
  }

  const user = mapInUser(cognitoUser);
  saveToStorage(user);
  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    error: '',
    user: null,
  } as AuthState,
  reducers: {},

  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.isLoading = false;
      console.log('login error', action.error);
      state.error = action.error;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload === USER_TYPE.FACEBOOK) {
        // If user payload is facebook then stay in loading state and wait for redirect to facebook
        // User state will be upfated after page reload in isAuthenticated
        state.isLoading = true;
      } else {
        state.isLoading = false;
        state.user = payload as IUser;
      }
    });
    // Logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    // IsAuthenticated
    builder.addCase(isAuthenticated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isAuthenticated.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(isAuthenticated.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
  },
});

// Export Actions

export const loginActionCreator = login;
export const logoutActionCreator = logout;
export const isAuthenticatedActionCreator = isAuthenticated;

const authReducer = authSlice.reducer;

export default authReducer;
