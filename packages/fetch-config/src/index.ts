import AWS from 'aws-sdk';
import fetchConfig from './fetch-config';

AWS.config.update({ region: 'ap-southeast-1' });

fetchConfig('/cdk-monorepo-backend/staging/frontend-config')
    .then((response) => {
        console.log(response);
    })
    .catch((err) => console.log(err));
