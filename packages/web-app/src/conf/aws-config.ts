import cdkExports from '../cdk-exports';

const USE_LOCAL = true;

const awsConfig = {
  ...cdkExports,
  oauth: {
    ...cdkExports.oauth,
    redirectSignIn: `${window.location.protocol}//${window.location.host}/profile/`,
    redirectSignOut: `${window.location.protocol}//${window.location.host}/profile/`,
  },
};

if (process.env.REACT_APP_IS_LOCAL && USE_LOCAL) {
  // Overwrite to local endpoint
  awsConfig.aws_graphqlEndpoint_authNone = 'http://localhost:3100/lambda-gq-resolver/graphql';
  awsConfig.aws_graphqlEndpoint_authRole = 'http://localhost:3100/lambda-gq-resolver/graphql';
  awsConfig.aws_graphqlEndpoint_authUser = 'http://localhost:3100/lambda-gq-resolver/graphql';
}

console.log('REACT_APP_IS_LOCAL', process.env.REACT_APP_IS_LOCAL);
console.log('NODE_ENV', process.env.NODE_ENV);

export default awsConfig;
