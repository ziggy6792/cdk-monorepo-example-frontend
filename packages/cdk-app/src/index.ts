// #!/usr/bin/env node
// import * as cdk from '@aws-cdk/core';
// import { PackagesStack } from '../lib/packages-stack';

// const app = new cdk.App();
// const stack = new PackagesStack(app, 'CDK-MonoRepo-Frontend');

/* eslint-disable no-new */

import * as cdk from '@aws-cdk/core';
import PipelineStack from './frontend-stack/pipeline-stack';
import * as utils from './utils';
import * as config from './config';
import createDummyStack from './dummy-stack';

module.exports = {};

const app = new cdk.App();

// Dummy stack
// createDummyStack(app);

// Pipeline

new PipelineStack(app, utils.getConstructId('pipeline'), {
    description: utils.getConstructId('pipeline'),
    env: {
        account: config.AWS_ACCOUNT_ID,
        region: config.AWS_REGION,
    },
});

app.synth();
