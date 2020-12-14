/* eslint-disable import/prefer-default-export */
import 'source-map-support/register';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

import axios from 'axios';
import { aws4Interceptor } from 'aws4-axios';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

// Don't install the types for some reasone it breaks things
import { buildAxiosFetch } from '@lifeomic/axios-fetch';

import SSM from 'aws-sdk/clients/ssm';

const interceptor = aws4Interceptor(
  {
    region: 'ap-southeast-1',
    service: 'execute-api',
  },
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  }
);
axios.interceptors.request.use(interceptor);

const HELLO = gql`
  {
    hello
  }
`;

const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      id
    }
  }
`;

export const handler = async (event: any): Promise<any> => {
  const logText = `
  GRAPHQL_API_URL = ${process.env.GRAPHQL_API_URL}
  AWS_ACCESS_KEY_ID = ${process.env.AWS_ACCESS_KEY_ID}
  AWS_SECRET_ACCESS_KEY = ${process.env.AWS_SECRET_ACCESS_KEY}
  AWS_SESSION_TOKEN = ${process.env.AWS_SESSION_TOKEN}
  `;

  console.log('recevied', JSON.stringify(event));
  console.log(logText);
  const ssm = new SSM();
  const params = await ssm.getParametersByPath({ Path: '/CDK-MonoRepo2/beconfig', Recursive: true }).promise();

  console.log('params', params);

  const client = new ApolloClient({
    link: createHttpLink({
      uri: process.env.GRAPHQL_API_URL,
      fetch: buildAxiosFetch(axios),
    }),
    cache: new InMemoryCache(),
  });

  try {
    // const response = await client.query({ query: HELLO });
    const response = await client.mutate({
      mutation: REGISTER,
      variables: {
        input: {
          firstName: 'Simon',
          lastName: 'Verhoeven',
          email: 'ziggy067@gmail.com',
        },
      },
    });

    console.log('response', response.data);
  } catch (err) {
    console.log({ err });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: 'done',
    }),
  };
};