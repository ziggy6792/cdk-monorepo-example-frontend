console.log('env', process.env);

const USE_LOCAL = false;

const awsConfig = {
  aws_project_region: window.env.AWS_REGION,
  aws_cognito_identity_pool_id: window.env.AWS_COGNITO_IDENDITY_POOL_ID,
  aws_cognito_region: window.env.AWS_REGION,
  aws_user_pools_id: window.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: window.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  aws_graphqlEndpoint_authUser: window.env.AWS_GRAPHQLENDPOINT_AUTHUSER,
  aws_graphqlEndpoint_authRole: window.env.AWS_GRAPHQLENDPOINT_AUTHROLE,
  oauth: {
    domain: window.env.AWS_OATH_DOMAIN,
    redirectSignIn: `${window.location.protocol}//${window.location.host}/profile/`,
    redirectSignOut: `${window.location.protocol}//${window.location.host}/profile/`,
    scope: ['openid', 'email', 'phone', 'aws.cognito.signin.user.admin'],
    responseType: 'code',
  },
};

console.log('awsConfig', awsConfig);

export default awsConfig;
