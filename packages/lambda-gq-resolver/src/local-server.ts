/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { serverParams, init as initGqServer } from '.';
// eslint-disable-next-line import/order

const app = express();

// Setup local grapql server

const apolloServer = new ApolloServer(serverParams);
initGqServer();

apolloServer.applyMiddleware({ app, path: '/lambda-gq-resolver/graphql' });

app.listen(3001, () => console.log('listening on port: 3001'));
