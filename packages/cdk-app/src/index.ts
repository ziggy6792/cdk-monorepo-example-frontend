/* eslint-disable no-new */
// #!/usr/bin/env node

import * as cdk from '@aws-cdk/core';

import PipelineStack from './frontend-stack/pipeline-stack';
import * as utils from './utils';

module.exports = {};

const app = new cdk.App();

// Dummy stack
// const stageName = 'prod';

// const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), `../${stageName}/build`);
// const ssmUrlParamId = utils.getSsmParamId('url', stageName);

// const stack = new DeploymentStack(app, `${PROJECT_NAME}-dummy-deployment`, {
//     websiteFolder,
//     ssmUrlParamId,
// });

// Pipeline

new PipelineStack(app, utils.getConstructId('pipeline'), {
    description: utils.getConstructId('pipeline'),
    env: {
        account: '694710432912',
        region: 'ap-southeast-1',
    },
});

app.synth();
