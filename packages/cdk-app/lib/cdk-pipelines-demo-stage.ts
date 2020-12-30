/* eslint-disable import/prefer-default-export */
import { Construct, Stage, StageProps } from '@aws-cdk/core';

import * as cdk from '@aws-cdk/core';
import ApigwDemoStack from './apigw-demo-stack';

export class CdkPipelinesDemoStage extends Stage {
  public readonly urlOutput: cdk.CfnOutput;
  // public stack: ApigwDemoStack;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const stackName = 'CDKMonoRepo-Frontend';

    const service = new ApigwDemoStack(this, stackName, id);

    // this.stack = service;
    // this.urlOutput = new cdk.CfnOutput(scope, `${stackName}-${id}`, { value: Fn.importValue('url') });
    // this.urlOutput = new cdk.CfnOutput(this, `${stackName}-${id}`, { value: service.urlOutput });
  }
}
