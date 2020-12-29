/* eslint-disable import/prefer-default-export */
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import path from 'path';
import * as defaults from '@aws-solutions-constructs/core';
import { SPADeploy } from 'cdk-spa-deploy';

export class PackagesStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaA = new lambda.Function(this, 'lambda-a', {
      functionName: 'lambda-a',
      memorySize: 256,
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(require.resolve('@danielblignaut/lambda-a'), '..')),
    });

    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    });

    const deployment = new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
      destinationBucket: websiteBucket,
      sources: [s3Deployment.Source.asset(path.join(require.resolve('@danielblignaut/web-app'), '..'))],
    });

    const output = new cdk.CfnOutput(this, 'Website Address', {
      value: websiteBucket.bucketWebsiteUrl,
    });

    // defaults.printWarning(path.join(require.resolve('@danielblignaut/web-app'), '..'));

    // console.log('hello');

    // new SPADeploy(this, 'Website Deploy').createBasicSite({ indexDoc: 'index.html', websiteFolder: '../frontend/build' });
  }
}
