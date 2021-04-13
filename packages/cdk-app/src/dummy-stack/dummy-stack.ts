// Dummy stack
import path from 'path';
import { PROJECT_NAME } from 'src/config';
import DeploymentStack from 'src/frontend-stack/deployment-stack';
import * as utils from 'src/utils';
import * as cdk from '@aws-cdk/core';

const createDummyStack = (scope: cdk.Construct) => {
  const stageName = 'prod';

  const websiteFolder = path.join(require.resolve('@alpaca-frontend/web-app'), `../${stageName}/build`);
  const ssmUrlParamId = utils.getSsmParamId('url', 'dummy');

  const stack = new DeploymentStack(scope, `${PROJECT_NAME}-dummy-deployment`, {
    websiteFolder,
    ssmUrlParamId,
  });
};

export default createDummyStack;
