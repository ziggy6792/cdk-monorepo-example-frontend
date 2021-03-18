import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// eslint-disable-next-line no-restricted-imports
import * as ApiFetch from '../utils/aws-api-fetch';
import awsConfig from './aws-config';

ApiFetch.configure(awsConfig);

const client = new ApolloClient({
    link: createHttpLink({
        fetch: ApiFetch.awsApiFetch,
    }),
    cache: new InMemoryCache(),
});

export default client;
