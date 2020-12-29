/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */

// import { setContext } from 'apollo-link-context';

import Auth from '@aws-amplify/auth';

import { aws4Interceptor } from 'aws4-axios';
import Axios from 'axios';
import { buildAxiosFetch } from '@lifeomic/axios-fetch';

interface IAwsGraphqlFetchConfig {
  aws_project_region: string;
  aws_graphqlEndpoint_authUser: string;
  aws_graphqlEndpoint_authRole: string;
  aws_graphqlEndpoint_authNone: string;
}

let gqFetchConfig: IAwsGraphqlFetchConfig | null = null;

interface ICredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}

const buildCognitoFetch = (jwtToken: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (uri: string, options: any) => {
    options.headers.Authorization = jwtToken;
    return fetch(uri, options);
  };
};

const buildIamFetch = (credentials: ICredentials) => {
  const axiosInstance = Axios.create();

  // Remove unsafe headers which are set by the browser instead
  axiosInstance.interceptors.request.use((config) => {
    delete config.headers.Host;
    delete config.headers['Content-Length'];
    return config;
  });

  const interceptor = aws4Interceptor(
    {
      region: gqFetchConfig.aws_project_region,
      service: 'execute-api',
    },
    { accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey, sessionToken: credentials.sessionToken }
  );

  axiosInstance.interceptors.request.use(interceptor);

  return buildAxiosFetch(axiosInstance);
};

export const configure = (config: IAwsGraphqlFetchConfig) => {
  gqFetchConfig = config;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const awsApiFetch = async (uri: string, options: any): Promise<any> => {
  const { aws_graphqlEndpoint_authUser: USER_AUTH_URL, aws_graphqlEndpoint_authRole: ROLE_AUTH_URL, aws_graphqlEndpoint_authNone: NO_AUTH_URL } = gqFetchConfig;

  try {
    const cognitoUser = await Auth.currentSession();

    const cognitoFetch = buildCognitoFetch(cognitoUser.getAccessToken().getJwtToken());

    return cognitoFetch(USER_AUTH_URL, options);
  } catch (err) {
    if (err === 'No current user') {
      console.log('Not logged in');
      try {
        const credentials = await Auth.currentCredentials();

        const iamFetch = buildIamFetch(credentials);

        return iamFetch(ROLE_AUTH_URL, options);
      } catch (err) {
        console.log('Error getting unauthorized user credentials', err);
      }
    } else {
      throw err;
    }
  }
  return fetch(NO_AUTH_URL, options);
};

export default awsApiFetch;
