/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ErrorResponse } from '@apollo/client/link/error';
import GenericErrorMessage from './generic-error-message';

interface IApiErrorMessageProps {
  error: ErrorResponse;
}

const ApiErrorMessage: React.FC<IApiErrorMessageProps> = ({ error }) => {
  const { graphQLErrors, networkError } = error;
  const displayErrors = [];

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      displayErrors.push(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
    );
  }

  if (networkError) {
    displayErrors.push(`[Network error]: ${networkError}`);
  }

  return <GenericErrorMessage errors={displayErrors} />;
};

export default ApiErrorMessage;
