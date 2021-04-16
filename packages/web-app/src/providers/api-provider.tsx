/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import introspectionQueryResultData from 'src/graphql/fragment-types.json';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { parseISO } from 'date-fns';
import { createTransformerLink } from 'apollo-client-transform';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import * as ApiFetch from 'src/utils/aws-api-fetch';
import introspectionToPossibleTypes from 'src/utils/intro-to-possible-types';
import Dialog from 'src/components/ui/dialog';
import { useHistory } from 'react-router';
import ApiErrorMessage from 'src/modules/errors/error-message/api-error-message';
import ErrorBox from 'src/modules/errors/error-box';

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

const ApiProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<ErrorResponse>(null);

  const history = useHistory();
  console.log('link', client.link);

  // client.link.setOnError((apolloError) => {
  //   setError(apolloError);
  //   console.log('apolloError', apolloError);
  //   // Do nothing
  // });

  const client = new ApolloClient({
    defaultOptions: {
      mutate: {
        // Errors are handled at global level
        errorPolicy: 'ignore',
      },
    },
    link: errorLink.concat(enhancedHttpLink as any),
    cache: new InMemoryCache({
      possibleTypes: introspectionToPossibleTypes(introspectionQueryResultData),
    }),
  });

  return (
    <ApolloProvider client={client}>
      {error && (
        <Dialog open>
          <ErrorBox
            buttons={
              <>
                <Grid item>
                  <Button variant='contained' onClick={() => setError(null)}>
                    OK
                  </Button>
                </Grid>
              </>
            }
          >
            <ApiErrorMessage error={error} />
          </ErrorBox>
        </Dialog>
      )}
      {!error && children}
    </ApolloProvider>
  );
};

export default ApiProvider;
