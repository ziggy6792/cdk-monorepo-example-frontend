// #!/usr/bin/env node
// import * as cdk from '@aws-cdk/core';
// import { PackagesStack } from '../lib/packages-stack';

// const app = new cdk.App();
// const stack = new PackagesStack(app, 'CDK-MonoRepo-Frontend');

/* eslint-disable no-new */

import * as cdk from '@aws-cdk/core';
import PipelineStack from '../lib/pipeline-stack';
import * as util from '../util';

module.exports = {};

const app = new cdk.App();
new PipelineStack(app, util.getConstructId('pipeline'), {
  description: util.getConstructId('pipeline'),
  env: {
    account: '694710432912',
    region: 'ap-southeast-1',
  },
});

app.synth();
