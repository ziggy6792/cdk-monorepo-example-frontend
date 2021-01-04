import React from 'react';
import Auth from '@aws-amplify/auth';
import ApolloClient from 'apollo-client';
import { Provider } from 'react-redux';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import awsConfig from './config/aws-config';
import Routes from './routes';
import store from './config/store';
import * as ApiFetch from './utils/aws-api-fetch';

Auth.configure(awsConfig);
ApiFetch.configure(awsConfig);

const client = new ApolloClient({
  link: createHttpLink({
    fetch: ApiFetch.awsApiFetch,
  }),
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <div className='App' style={{ height: '100vh', width: '100vw' }}>
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

// const WithProvider: React.FC = () => {
//   const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//     typeDefs,
//     resolvers: resolvers as any,
//   });
//   return (
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   );
// };

export default WithProvider;
