/* eslint-disable no-underscore-dangle */
import React from 'react';
import Auth from '@aws-amplify/auth';
import { Provider } from 'react-redux';
import Routes from 'src/routes';
import envConfig from './config/env-config';
import awsConfig from './config/aws-config';
import initStore from './config/store';
import * as ApiFetch from './utils/aws-api-fetch';
import ApiProvider from './providers/api-provider';

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

const WithProvider: React.FC = () => (
  // <ThemeProvider theme={Theme}>
  <Provider store={store}>
    <ApiProvider>
      <App />
    </ApiProvider>
  </Provider>
  // </ThemeProvider>
);

export default WithProvider;
