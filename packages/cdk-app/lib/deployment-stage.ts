/* eslint-disable import/prefer-default-export */
import { Construct, Stage, StageProps } from '@aws-cdk/core';

import * as cdk from '@aws-cdk/core';
import * as defaults from '@aws-solutions-constructs/core';
import * as path from 'path';
import DeploymentStack from './deployment-stack';
import * as utils from '../utils';

export class DeploymentStage extends Stage {
  public readonly urlOutput: cdk.CfnOutput;
  // public stack: ApigwDemoStack;

  constructor(scope: Construct, id: string, stage?: string, props?: StageProps) {
    super(scope, id, props);

    const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), `../${stage}/build`);
    const ssmUrlParamId = utils.getSsmParamId('url', stage);

    const stack = new DeploymentStack(this, 'deployment', { websiteFolder, ssmUrlParamId });

    // defaults.printWarning(websiteFolder);

    // this.stack = service;
    // this.urlOutput = new cdk.CfnOutput(scope, `${stackName}-${id}`, { value: Fn.importValue('url') });
    // this.urlOutput = new cdk.CfnOutput(this, `${stackName}-${id}`, { value: service.urlOutput });
  }
}
