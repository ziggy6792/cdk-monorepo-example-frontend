import './ui/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Logger from 'js-logger';
import Auth from '@aws-amplify/auth';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './ui/theme';
import initStore from './config/store';
import awsConfig from './config/aws-config';
import reportWebVitals from './reportWebVitals';
import * as ApiFetch from './utils/aws-api-fetch';

import Routes from './root-routes';

Auth.configure(awsConfig);
ApiFetch.configure(awsConfig);
const store = initStore();

Logger.setLevel(Logger.INFO);
// eslint-disable-next-line react-hooks/rules-of-hooks
Logger.useDefaults();

console.log('ENV', window.env);

const client = new ApolloClient({
    link: createHttpLink({
        fetch: ApiFetch.awsApiFetch,
    }),
    cache: new InMemoryCache(),
});

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
