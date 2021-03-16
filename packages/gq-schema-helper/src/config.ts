const config = {
    endpoint: {
        dev: 'http://localhost:3100/lambda-gq-resolver/auth-none/graphql',
        staging: 'https://l6fheds7c7.execute-api.ap-southeast-1.amazonaws.com/staging/auth-none/graphql',
        // don't need prod as the staging schema will always be the same
        // prod: 'https://c88fel7mw4.execute-api.ap-southeast-1.amazonaws.com/prod/auth-none/graphql',
    },
};

export default config;
