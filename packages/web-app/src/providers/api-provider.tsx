/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import introspectionQueryResultData from 'src/graphql/fragment-types.json';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Routes from 'src/routes';
import { parseISO } from 'date-fns';
import { createTransformerLink } from 'apollo-client-transform';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { Button } from '@material-ui/core';
import * as ApiFetch from 'src/utils/aws-api-fetch';
import introspectionToPossibleTypes from 'src/utils/intro-to-possible-types';

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
  Competition: { ...CreatableTransformers },
  ScheduleItem: { ...CreatableTransformers, startTime: DateTransformer },
};

const renderError = (apolloError: ErrorResponse): React.ReactNode => {
  const { graphQLErrors, networkError } = apolloError;
  const displayErrors = [];

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => displayErrors.push(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }

  if (networkError) {
    displayErrors.push(`[Network error]: ${networkError}`);
  }
  return displayErrors.map(error => <div>{error}</div>);
};

const ApiProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<ErrorResponse>(null);

  const transformerLink = createTransformerLink(transformers as any);
  const enhancedHttpLink = transformerLink.concat(createHttpLink({ fetch: ApiFetch.awsApiFetch }) as any);

  const errorLink = onError(apolloError => {
    setError(apolloError);
  });

  const client = new ApolloClient({
    link: errorLink.concat(enhancedHttpLink as any),
    cache: new InMemoryCache({
      possibleTypes: introspectionToPossibleTypes(introspectionQueryResultData),
    }),
  });
  return (
    <ApolloProvider client={client}>
      {error && (
        <>
          {renderError(error)}
          <Button onClick={() => setError(null)}>Clear Error</Button>
        </>
      )}
      {!error && children}
    </ApolloProvider>
  );
};

export default ApiProvider;
