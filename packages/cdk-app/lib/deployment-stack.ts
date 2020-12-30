import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import { SPADeploy } from 'cdk-spa-deploy';
import * as ssm from '@aws-cdk/aws-ssm';
import * as defaults from '@aws-solutions-constructs/core';
import * as util from '../util';

class DeploymentStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, stage?: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), '..');

    const webstie = new SPADeploy(this, 'website').createBasicSite({ indexDoc: 'index.html', errorDoc: 'index.html', websiteFolder });

    const paramId = util.getSsmParamId('deployment_url', stage);

    defaults.printWarning(paramId);

    const websiteUrl = new ssm.StringParameter(this, paramId, {
      parameterName: paramId,
      stringValue: webstie.websiteBucket.bucketWebsiteUrl,
    });
  }
}

export default DeploymentStack;
