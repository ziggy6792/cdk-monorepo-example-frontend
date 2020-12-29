import _ from 'lodash';
import cdkExports from '../cdk-exports';

const awsConfig = _.cloneDeep(cdkExports);

// Overwrite to local endpoint
awsConfig.aws_graphqlEndpoint_authNone = 'http://localhost:3100/lambda-gq-resolver/graphql';
awsConfig.aws_graphqlEndpoint_authRole = 'http://localhost:3100/lambda-gq-resolver/graphql';
awsConfig.aws_graphqlEndpoint_authUser = 'http://localhost:3100/lambda-gq-resolver/graphql';

awsConfig.oauth.redirectSignIn = `${window.location.protocol}//${window.location.host}${cdkExports.oauth.redirectSignIn}`;
awsConfig.oauth.redirectSignOut = `${window.location.protocol}//${window.location.host}${cdkExports.oauth.redirectSignIn}`;

export default awsConfig;
