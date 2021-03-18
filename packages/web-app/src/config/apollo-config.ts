import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'src/graphql/fragment-types.json';

// eslint-disable-next-line no-restricted-imports
import * as ApiFetch from '../utils/aws-api-fetch';
import awsConfig from './aws-config';

ApiFetch.configure(awsConfig);

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

const client = new ApolloClient({
    link: createHttpLink({
        fetch: ApiFetch.awsApiFetch,
    }),
    cache: new InMemoryCache({ fragmentMatcher }),
});

export default client;
