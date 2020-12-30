import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { SPADeploy } from 'cdk-spa-deploy';

class ApigwDemoStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, stageName: string, props?: cdk.StackProps) {
    super(scope, id, props);

    super(scope, id, props);

    const lambdaA = new lambda.Function(this, 'lambda-a', {
      functionName: 'lambda-a',
      memorySize: 256,
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(require.resolve('@danielblignaut/lambda-a'), '..')),
    });

    // const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
    //   publicReadAccess: true,
    //   websiteIndexDocument: 'index.html',
    //   websiteErrorDocument: 'index.html',
    // });

    // const deployment = new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
    //   destinationBucket: websiteBucket,
    //   sources: [s3Deployment.Source.asset(path.join(require.resolve('@danielblignaut/web-app'), '..'))],
    // });

    // const output = new cdk.CfnOutput(this, 'Website Address', {
    //   value: websiteBucket.bucketWebsiteUrl,
    // });

    const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), '..');

    // defaults.printWarning(path.join(require.resolve('@danielblignaut/web-app'), '..'));

    // console.log('hello');

    new SPADeploy(this, `${id}-${stageName}`).createSiteWithCloudfront({ indexDoc: 'index.html', errorDoc: 'index.html', websiteFolder });
  }
}

export default ApigwDemoStack;
