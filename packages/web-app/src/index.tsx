import './ui/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Logger from 'js-logger';
import Auth from '@aws-amplify/auth';
import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';

import { ThemeProvider } from '@material-ui/core/styles';

import theme from './ui/theme';
import initStore from './config/store';
import awsConfig from './config/aws-config';
import reportWebVitals from './reportWebVitals';
import client from './config/apollo-config';

import Routes from './root-routes';

Auth.configure(awsConfig);

const store = initStore();

Logger.setLevel(Logger.INFO);
// eslint-disable-next-line react-hooks/rules-of-hooks
Logger.useDefaults();

console.log('ENV', window.env);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <Routes />
                </ApolloProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
