import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import { SPADeploy } from 'cdk-spa-deploy';

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
