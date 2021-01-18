/* eslint-disable import/prefer-default-export */
import { Construct, Stage, StageProps } from '@aws-cdk/core';

import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import * as utils from 'src/utils';
import DeploymentStack from './deployment-stack';

export interface DeploymentStageProps extends cdk.StackProps {
  readonly stageName: string;
}
export class DeploymentStage extends Stage {
  public readonly urlOutput: cdk.CfnOutput;
  // public stack: ApigwDemoStack;

  constructor(scope: Construct, id: string, props?: DeploymentStageProps) {
    super(scope, id, props);

    const { stageName } = props;

    const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), `../${stageName}/build`);
    const ssmUrlParamId = utils.getSsmParamId('url', stageName);

    const stack = new DeploymentStack(this, 'deployment', { websiteFolder, ssmUrlParamId });

    // defaults.printWarning(websiteFolder);

    // this.stack = service;
    // this.urlOutput = new cdk.CfnOutput(scope, `${stackName}-${id}`, { value: Fn.importValue('url') });
    // this.urlOutput = new cdk.CfnOutput(this, `${stackName}-${id}`, { value: service.urlOutput });
  }
}
