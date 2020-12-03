import { graphql, Source } from 'graphql';
import { Maybe } from 'type-graphql';
import createSchema from '../graph-ql/create-schema';

interface Options {
  source: string;
  variableValues: Maybe<{
    [key: string]: any;
  }>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const gCall = ({ source, variableValues }: Options) => {
  return graphql({
    schema: createSchema(),
    source,
    variableValues,
  });
};

export default gCall;
