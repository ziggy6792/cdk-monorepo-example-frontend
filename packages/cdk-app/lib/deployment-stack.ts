import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { SPADeploy } from 'cdk-spa-deploy';
import * as defaults from '@aws-solutions-constructs/core';

class ApigwDemoStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), '..');

    // defaults.printWarning(path.join(require.resolve('@danielblignaut/web-app'), '..'));

    new SPADeploy(this, 'website').createBasicSite({ indexDoc: 'index.html', errorDoc: 'index.html', websiteFolder });
  }
}

export default ApigwDemoStack;
