/* eslint-disable no-underscore-dangle */
import React from 'react';
import introspectionQueryResultData from 'src/graphql/fragment-types.json';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { parseISO } from 'date-fns';
import { createTransformerLink } from 'apollo-client-transform';
import { onError } from '@apollo/client/link/error';
import * as ApiFetch from 'src/utils/aws-api-fetch';
import introspectionToPossibleTypes from 'src/utils/intro-to-possible-types';
import { store } from 'src/config/store';
import { setErrorsActionCreator, ErrorType } from 'src/domain/error';

const DateTransformer = {
  parseValue(date: string) {
    return date ? parseISO(date) : null;
  },
};

const CreatableTransformers = { createdAt: DateTransformer, modifiedAt: DateTransformer };
const SchedulableTransformers = { ...CreatableTransformers, startTime: DateTransformer };

const transformers = {
  User: { ...CreatableTransformers },
  Round: { ...SchedulableTransformers },
  RiderAllocation: { ...CreatableTransformers },
  Heat: { ...CreatableTransformers },
  Event: { ...CreatableTransformers, startTime: DateTransformer },
  Competition: { ...CreatableTransformers, startTime: DateTransformer },
  ScheduleItem: { ...CreatableTransformers, startTime: DateTransformer },
};

const transformerLink = createTransformerLink(transformers as any);
const enhancedHttpLink = transformerLink.concat(createHttpLink({ fetch: ApiFetch.awsApiFetch }) as any);

const errorLink = onError((apolloError) => {
  // ToDo: Accessing store outside of component. Maybe this is hacky

  const { graphQLErrors, networkError } = apolloError;
  const errors = [];

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      errors.push({ type: ErrorType.GRAPHQL_ERROR, displayText: `Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}` })
    );
  }

  if (networkError) {
    errors.push({ type: ErrorType.NETWORK_ERROR, displayText: `${networkError}` });
  }
  store.dispatch(setErrorsActionCreator({ errors }));
});

const client = new ApolloClient({
  link: errorLink.concat(enhancedHttpLink as any),
  cache: new InMemoryCache({
    possibleTypes: introspectionToPossibleTypes(introspectionQueryResultData),
    typePolicies: {
      RiderAllocation: {
        keyFields: ['allocatableId', 'userId'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      // errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'ignore',
    },
  },
});

const ApiProvider: React.FC = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default ApiProvider;
