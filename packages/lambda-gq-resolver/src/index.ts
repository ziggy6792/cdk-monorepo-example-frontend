/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
// import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

import 'reflect-metadata';
import * as serverless from 'aws-serverless-express';
import Express from 'express';
import { buildSchemaSync, Resolver, Query } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

@Resolver()
class HelloResolver {
  private recipesCollection: string[] = [];

  @Query((returns) => String)
  async hello() {
    return 'Hello World';
  }
}

(global as any).schema =
  (global as any).schema ||
  buildSchemaSync({
    resolvers: [HelloResolver],
  });

const schema = (global as any).schema as GraphQLSchema;

export const handler = (event, context) => {
  const app = Express();

  const apolloServer = new ApolloServer({ schema, playground: true, introspection: true });

  apolloServer.applyMiddleware({ app });

  const server = serverless.createServer(app);
  return serverless.proxy(server, event, context);
};
