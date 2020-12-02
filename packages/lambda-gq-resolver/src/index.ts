/* eslint-disable import/prefer-default-export */
import 'source-map-support/register';
import {ApolloServer} from 'apollo-server-express'
import { buildSchema, Resolver } from 'type-graphql';

@Resolver()
class RecipeResolver {
  private recipesCollection: Recipe[] = [];

  async recipes() {
    // fake async in this example
    return await this.recipesCollection;
  }
}

export const handler = async (event: any): Promise<any> => {

  const shcema = await buildSchema (
    resolvers: [FirstResolver, SampleResolver],
  )

  const apolloServer = new ApolloServer({})



  return { 
    statusCode: 200,
    body: 'hello from lambda-gq-resolver',
  };
};
