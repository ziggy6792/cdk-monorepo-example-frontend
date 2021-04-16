/* eslint-disable no-underscore-dangle */
import React from 'react';
import introspectionQueryResultData from 'src/graphql/fragment-types.json';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { parseISO } from 'date-fns';
import { createTransformerLink } from 'apollo-client-transform';
import { onError } from '@apollo/client/link/error';
import { Button, Grid } from '@material-ui/core';
import * as ApiFetch from 'src/utils/aws-api-fetch';
import introspectionToPossibleTypes from 'src/utils/intro-to-possible-types';
import Dialog from 'src/components/ui/dialog';
import ApiErrorMessage from 'src/modules/errors/error-message/api-error-message';
import ErrorBox from 'src/modules/errors/error-box';
import { store } from 'src/config/store';
import { errorActionCreator } from 'src/domain/error';
import errorSelector from 'src/domain/error/selectors';
import { useDispatch, useSelector } from 'react-redux';

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

const transformerLink = createTransformerLink(transformers as any);
const enhancedHttpLink = transformerLink.concat(createHttpLink({ fetch: ApiFetch.awsApiFetch }) as any);

const errorLink = onError((apolloError) => {
  // ToDo: Accessing store outside of component. Maybe this is hacky
  store.dispatch(errorActionCreator({ apiError: apolloError }));
});

const client = new ApolloClient({
  link: errorLink.concat(enhancedHttpLink as any),
  cache: new InMemoryCache({
    possibleTypes: introspectionToPossibleTypes(introspectionQueryResultData),
  }),
});

const ApiProvider: React.FC = ({ children }) => {
  const apiError = useSelector(errorSelector.selectApiError);

  const dispatch = useDispatch();

  return (
    <ApolloProvider client={client}>
      {apiError && (
        <Dialog open>
          <ErrorBox
            buttons={
              <>
                <Grid item>
                  <Button variant='contained' onClick={() => dispatch(errorActionCreator({ apiError: null }))}>
                    OK
                  </Button>
                </Grid>
              </>
            }
          >
            <ApiErrorMessage error={apiError} />
          </ErrorBox>
        </Dialog>
      )}
      {!apiError && children}
    </ApolloProvider>
  );
};

export default ApiProvider;
