/* eslint-disable import/prefer-default-export */
import * as cdk from '@aws-cdk/core';

import { Stack, StackProps, Construct, SecretValue, Fn } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';

import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipelineActions from '@aws-cdk/aws-codepipeline-actions';
import { CdkPipelinesDemoStage } from './cdk-pipelines-demo-stage';

export class CdkpipelinesDemoPipelineStack extends Stack {
  public readonly devUrlOutput: cdk.CfnOutput;

  public readonly prodUrlOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, 'CDK-MonoRepo-Frontend-Pipeline', {
      pipelineName: 'CDK-MonoRepo-Frontend-Pipeline',
      cloudAssemblyArtifact,

      sourceAction: new codepipelineActions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('GITHUB_OATH_TOKEN', { jsonField: 'GITHUB_OATH_TOKEN' }),
        trigger: codepipelineActions.GitHubTrigger.POLL,
        // Replace these with your actual GitHub project info
        owner: 'ziggy6792',
        repo: 'cdk-monorepo-example-frontend-2',
        branch: 'feature/cdk-pipeline',
      }),

      synthAction: SimpleSynthAction.standardYarnSynth({
        sourceArtifact,
        cloudAssemblyArtifact,

        // Use this if you need a build step (if you're not using ts-node
        // or if you have TypeScript Lambdas that need to be compiled).
        buildCommand: 'yarn run build',
      }),
    });

    // Do this as many times as necessary with any account and region
    // Account and region may be different from the pipeline's.
    const deployedDevStage = new CdkPipelinesDemoStage(this, 'dev', {
      env: {
        account: '694710432912',
        region: 'ap-southeast-1',
      },
    });

    // if (deployedDevStage.urlOutput.exportName) {
    //   this.devUrlOutput = new cdk.CfnOutput(this, deployedDevStage.urlOutput.exportName, { value: deployedDevStage.urlOutput.importValue });
    // }

    // this.devUrlOutput = new cdk.CfnOutput(this, 'webservice-dev-url', { value: Fn.importValue('webservice-dev') });

    // Fn.importValue('webservice-dev');

    const devStage = pipeline.addApplicationStage(deployedDevStage);

    // pipeline.

    // Manual Approval
    // devStage.addActions(
    //   new ManualApprovalAction({
    //     actionName: 'ManualApproval',
    //     runOrder: devStage.nextSequentialRunOrder(),
    //   })
    // );

    // Do this as many times as necessary with any account and region
    // Account and region may be different from the pipeline's.

    const deployedProdStage = new CdkPipelinesDemoStage(this, 'prod', {
      env: {
        account: '694710432912',
        region: 'ap-southeast-1',
      },
    });

    pipeline.addApplicationStage(deployedProdStage);

    // if (deployedProdStage.urlOutput.exportName) {
    //   this.prodUrlOutput = new cdk.CfnOutput(this, deployedProdStage.urlOutput.exportName, { value: deployedProdStage.urlOutput.importValue });
    // }
    // this.devUrlOutput = new cdk.CfnOutput(this, 'webservice-prod', { value: Fn.importValue('webservice-prod') });

    // this.urlOutput = service.urlOutput;
  }
}
