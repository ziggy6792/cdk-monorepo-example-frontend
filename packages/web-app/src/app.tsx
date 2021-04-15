/* eslint-disable no-underscore-dangle */
import React from 'react';
import Auth from '@aws-amplify/auth';
import { Provider } from 'react-redux';
import Routes from 'src/routes';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Theme from 'src/ui/theme';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Grid } from '@material-ui/core';
import envConfig from './config/env-config';
import awsConfig from './config/aws-config';
import initStore from './config/store';
import * as ApiFetch from './utils/aws-api-fetch';
import ApiProvider from './providers/api-provider';
import Dialog from './components/ui/dialog';
import ErrorBox from './modules/errors/error-box';
import ApiErrorMessage from './modules/errors/error-message/api-error-message';
import GenericErrorMessage from './modules/errors/error-message/generic-error-message';

Auth.configure(awsConfig);
ApiFetch.configure(awsConfig);
const store = initStore();

// Solution from https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
const calcVh = () => {
  (document.querySelector(':root') as any).style.setProperty('--vh', `${window.innerHeight / 100}px`);
};

calcVh();
window.addEventListener('resize', () => {
  calcVh();
});

document.title = envConfig.title;

const App: React.FC = () => (
  <div className='App' style={{ height: 'calc(100 * var(--vh))', width: '100%' }}>
    <Routes />
  </div>
);

interface IErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<IErrorFallbackProps> = ({ error }) => {
  console.log('error', error);
  console.log('error message', JSON.stringify(error.message));
  return (
    <Dialog open>
      <ErrorBox
        title='Oh No!'
        buttons={
          <>
            <Grid item>
              <Button variant='contained' onClick={() => window.location.reload()}>
                OK
              </Button>
            </Grid>
          </>
        }
      >
        <GenericErrorMessage
          error={
            <>
              <div>${error?.message}</div>
              <br />
              <div>${JSON.stringify(error.stack)}</div>
            </>
          }
        />
      </ErrorBox>
    </Dialog>
  );
};

const WithProvider: React.FC = () => (
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <Provider store={store}>
        <ApiProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </ApiProvider>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

export default WithProvider;
