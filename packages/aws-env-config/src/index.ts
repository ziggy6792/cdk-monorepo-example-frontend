#!/usr/bin/env node

import AWS from 'aws-sdk';
import util from 'util';
import fetchConfig from './fetch-config';

AWS.config.update({ region: 'ap-southeast-1' });

console.log('HELLO');
console.log(`dir ${__dirname}`);

process.argv.forEach((val, index, array) => {
    console.log(`${index}: ${val}`);
});

// util.inspect(process);

console.log('process');
console.log(`called from ${process.env.INIT_CWD}`);

fetchConfig('/cdk-monorepo-backend/staging/frontend-config')
    .then((response) => {
        console.log(response);
    })
    .catch((err) => console.log(err));

// console.log('aws-env-config bla');
