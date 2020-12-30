// #!/usr/bin/env node
// import * as cdk from '@aws-cdk/core';
// import { PackagesStack } from '../lib/packages-stack';

// const app = new cdk.App();
// const stack = new PackagesStack(app, 'CDK-MonoRepo-Frontend');

/* eslint-disable no-new */

import * as cdk from '@aws-cdk/core';
import { CdkpipelinesDemoPipelineStack } from '../lib/cdk-pipelines-demo-pipeline-stack';

module.exports = {};

const app = new cdk.App();
new CdkpipelinesDemoPipelineStack(app, 'CDK-MonoRepo-Frontend-Pipeline', {
  env: {
    account: '694710432912',
    region: 'ap-southeast-1',
  },
});

app.synth();
