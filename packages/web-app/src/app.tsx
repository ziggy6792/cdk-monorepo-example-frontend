/* eslint-disable no-underscore-dangle */
import React from 'react';
import Auth from '@aws-amplify/auth';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import GenericErrorMessage from './modules/errors/error-message/generic-error-message';
import errorSelector from './domain/error/selectors';
import { clearErrorsActionCreator } from './domain/error';

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

// Catches errors in rendering
const ErrorFallback: React.FC<IErrorFallbackProps> = ({ error }) => (
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

// Handles errors caused by user events
const GlobalErrorWrapper: React.FC = ({ children }) => {
  const errors = useSelector(errorSelector.selectErrors);
  const dispatch = useDispatch();
  return (
    <>
      {errors && (
        <Dialog open>
          <ErrorBox
            buttons={
              <>
                <Grid item>
                  <Button variant='contained' onClick={() => dispatch(clearErrorsActionCreator())}>
                    OK
                  </Button>
                </Grid>
              </>
            }
          >
            <GenericErrorMessage errors={errors.map((error) => `[${error.type}] : ${error.displayText}`)} />
          </ErrorBox>
        </Dialog>
      )}
      {!errors && children}
    </>
  );
};

const WithProvider: React.FC = () => (
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <Provider store={store}>
        <ApiProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <GlobalErrorWrapper>
              <App />
            </GlobalErrorWrapper>
          </ErrorBoundary>
        </ApiProvider>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

export default WithProvider;
