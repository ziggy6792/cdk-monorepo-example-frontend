const cdkExports = {
  aws_project_region: 'ap-southeast-1',
  aws_cognito_identity_pool_id: 'ap-southeast-1:25f7932c-e731-4beb-8018-3bbbe0448be1',
  aws_cognito_region: 'ap-southeast-1',
  aws_user_pools_id: 'ap-southeast-1_bhS0HEQAm',
  aws_user_pools_web_client_id: '7aq7mh2ko4f8rsdft4mubn4ks7',
  aws_graphqlEndpoint_authUser: 'https://dhdqbswut9.execute-api.ap-southeast-1.amazonaws.com/dev/auth-user/graphql',
  aws_graphqlEndpoint_authRole: 'https://dhdqbswut9.execute-api.ap-southeast-1.amazonaws.com/dev/auth-role/graphql',
  aws_graphqlEndpoint_authNone: 'https://dhdqbswut9.execute-api.ap-southeast-1.amazonaws.com/dev/auth-none/graphql',
  oauth: {
    domain: 'alpaca-dev.auth.ap-southeast-1.amazoncognito.com',
    scope: ['openid', 'email', 'phone', 'aws.cognito.signin.user.admin'],
    redirectSignIn: '/profile/',
    redirectSignOut: '/profile/',
    responseType: 'code',
  },
};

export default cdkExports;
