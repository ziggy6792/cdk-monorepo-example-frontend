console.log('env', process.env);

const USE_LOCAL = false;

const awsConfig = {
    aws_project_region: process.env.REACT_APP_AWS_REGION,
    aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENDITY_POOL_ID,
    aws_cognito_region: process.env.REACT_APP_AWS_REGION,
    aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
    aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
    aws_graphqlEndpoint_authUser: process.env.REACT_APP_AWS_GRAPHQLENDPOINT_AUTHUSER,
    aws_graphqlEndpoint_authRole: process.env.REACT_APP_AWS_GRAPHQLENDPOINT_AUTHROLE,
    aws_graphqlEndpoint_authNone: process.env.REACT_APP_AWS_GRAPHQLENDPOINT_AUTHNONE,
    oauth: {
        domain: process.env.REACT_APP_AWS_OATH_DOMAIN,
        redirectSignIn: `${window.location.protocol}//${window.location.host}/profile/`,
        redirectSignOut: `${window.location.protocol}//${window.location.host}/profile/`,
        scope: ['openid', 'email', 'phone', 'aws.cognito.signin.user.admin'],
        responseType: 'code',
    },
};

if (process.env.REACT_APP_ENV === 'dev' && USE_LOCAL) {
    // Overwrite to local endpoint
    awsConfig.aws_graphqlEndpoint_authNone = 'http://localhost:3100/lambda-gq-resolver/graphql';
    awsConfig.aws_graphqlEndpoint_authRole = 'http://localhost:3100/lambda-gq-resolver/graphql';
    awsConfig.aws_graphqlEndpoint_authUser = 'http://localhost:3100/lambda-gq-resolver/graphql';
}

console.log('awsConfig', awsConfig);

export default awsConfig;
