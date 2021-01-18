import React from 'react';
import Auth from '@aws-amplify/auth';
import ApolloClient from 'apollo-client';
import { Provider } from 'react-redux';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import Routes from 'src/routes';
import envConfig from './config/env-config';
import awsConfig from './config/aws-config';
import initStore from './config/store';
import * as ApiFetch from './utils/aws-api-fetch';

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

const client = new ApolloClient({
    link: createHttpLink({
        fetch: ApiFetch.awsApiFetch,
    }),
    cache: new InMemoryCache(),
});

const App: React.FC = () => (
    <div className='App' style={{ height: 'calc(100 * var(--vh))', width: '100%' }}>
        <Routes />
    </div>
);

const WithProvider: React.FC = () => (
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>
);

export default WithProvider;
