// #!/usr/bin/env node
// import * as cdk from '@aws-cdk/core';
// import { PackagesStack } from '../lib/packages-stack';

// const app = new cdk.App();
// const stack = new PackagesStack(app, 'CDK-MonoRepo-Frontend');

/* eslint-disable no-new */

import * as cdk from '@aws-cdk/core';
import PipelineStack from './frontend-stack/pipeline-stack';
import * as utils from './utils';

module.exports = {};

const app = new cdk.App();
new PipelineStack(app, utils.getConstructId('pipeline'), {
  description: utils.getConstructId('pipeline'),
  env: {
    account: '694710432912',
    region: 'ap-southeast-1',
  },
});

app.synth();
