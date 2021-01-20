/* eslint-disable @typescript-eslint/no-var-requires */

// async function myInit() {
//     const response = await fetch('./env.json');
//     const json = await response.json();
//     console.log('env json', json);
// }

function loadEnv() {
    // Load json file;
    const json = loadTextFileAjaxSync('./env.json', 'application/json');

    console.log('sync json', json);
    // Parse json
    return JSON.parse(json);
}

function loadTextFileAjaxSync(filePath, mimeType) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    if (mimeType != null) {
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType(mimeType);
        }
    }
    xmlhttp.send();
    if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
        return xmlhttp.responseText;
    }

    // TODO Throw exception
    return null;
}

const env = loadEnv();

window.env = env;

// window.env = {
//     ENV: 'dev',
//     AWS_REGION: 'ap-southeast-1',
//     AWS_USER_POOLS_ID: 'ap-southeast-1_jSZ2DotQB',
//     AWS_COGNITO_IDENDITY_POOL_ID: 'ap-southeast-1:260bee68-fcaf-4172-a4e6-f827fd58ebd5',
//     AWS_USER_POOLS_WEB_CLIENT_ID: '43eqpreab7oaukvpehs6037cdt',
//     AWS_GRAPHQLENDPOINT_AUTHUSER: 'https://b1q86ewa3l.execute-api.ap-southeast-1.amazonaws.com/staging/auth-user/graphql',
//     AWS_GRAPHQLENDPOINT_AUTHROLE: 'https://b1q86ewa3l.execute-api.ap-southeast-1.amazonaws.com/staging/auth-user/graphql',
//     AWS_GRAPHQLENDPOINT_AUTHNONE: 'https://b1q86ewa3l.execute-api.ap-southeast-1.amazonaws.com/staging/auth-none/graphql',
//     AWS_OATH_DOMAIN: 'monorepo-staging.auth.ap-southeast-1.amazoncognito.com',
// };
