/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { Auth } from 'aws-amplify';
import Logger from 'js-logger';
import _ from 'lodash';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Context } from 'react-apollo';
import { defaultIfNull } from '../util/utility';
import { GuestLogin } from '../conf/content';

interface SignInParams {
  email: string;
  password: string;
  authType: string;
}

export const typeDefs = gql`
  type AuthenticatedUser {
    id: String!
    email: String!
    email_verified: Boolean!
    given_name: String!
    family_name: String!
    email: String!
    nameDisplayText: String!
    picture: String
    isGuest: Boolean
    isAuthenticated: Boolean
  }
`;

interface IAuthenticatedUser {
  id: string;
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  nameDisplayText: string;
  picture: string;
  isGuest: boolean;
  isAuthenticated: boolean;
}

interface IError {
  errors: [string];
}

type ResolverFn = (_root: any, variables: any, ctx: Context) => any;
interface ResolverMap {
  [field: string]: ResolverFn;
}

interface Resolvers {
  Query: ResolverMap;
  Mutation: ResolverMap;
}

export const resolvers: Resolvers = {
  Query: {
    getAutenticatedUser: async (_root, variables, { client }): Promise<IAuthenticatedUser | IError> => {
      // return !!localStorage.getItem('token');
      let user;
      try {
        user = await Auth.currentAuthenticatedUser();
      } catch (err) {
        // Do nothing
        // await
        console.log({ err });
      }
      return buildAauthUser(user);
    },
  },
  Mutation: {
    login: async (_root, variables: SignInParams, { client }): Promise<IAuthenticatedUser | IError> => {
      // client.resetStore();
      const { email, password, authType } = variables;

      Logger.info('login credentials', email, password, authType);
      // await delay(3000);

      let user;
      try {
        switch (authType) {
          case undefined:
            user = await Auth.signIn(email, password);
            break;
          case 'Facebook':
            user = await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
            // Logger.info("Facebook!", user)
            // alert("stop")
            break;
          case 'HostedUi':
            user = await Auth.federatedSignIn();
            break;

          default:
            break;
        }
      } catch (error) {
        // Logger.info("Resolver - ", error);
        return {
          errors: [error.message],
        };
      }

      return buildAauthUser(user);
    },
  },
};

const buildAauthUser = async (_user): Promise<IAuthenticatedUser> => {
  // Logger.info("buildAauthUser",user)
  let authUser = { __typename: 'AuthenticatedUser' } as Partial<IAuthenticatedUser>;
  if (_user && _user.attributes) {
    const user = _.clone(_user);
    delete user.attributes['custom:signUpAttributes'];
    const { attributes } = user;
    authUser = {
      ...authUser,
      type: 'AuthenticatedUser',
      ...attributes,
      id: user.username,
    };
    authUser.picture = defaultIfNull(authUser.picture, null);

    authUser.isGuest = authUser.email === GuestLogin.email;
    authUser.isAuthenticated = !authUser.isGuest;
    authUser.nameDisplayText = authUser.isGuest ? 'Guest' : `${attributes.given_name} ${attributes.family_name}`;

    authUser.nameDisplayText = authUser.id.includes('Facebook') ? `${authUser.nameDisplayText} (FB)` : authUser.nameDisplayText;
  }
  return authUser as IAuthenticatedUser;
};
