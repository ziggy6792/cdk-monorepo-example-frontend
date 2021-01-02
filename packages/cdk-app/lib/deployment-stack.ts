import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import { SPADeploy } from 'cdk-spa-deploy';
import * as ssm from '@aws-cdk/aws-ssm';
import * as defaults from '@aws-solutions-constructs/core';
import * as util from '../util';

export interface DeploymentStackProps extends cdk.StackProps {
  readonly websiteFolder: string;
  readonly ssmUrlParamId: string;
}
class DeploymentStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: DeploymentStackProps) {
    super(scope, id, props);

    const { websiteFolder, ssmUrlParamId } = props;
    // const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), '..');
    // const websiteFolder = path.join(require.resolve('@danielblignaut/web-app'), '..');

    const webstie = new SPADeploy(this, 'website').createSiteWithCloudfront({ indexDoc: 'index.html', errorDoc: 'index.html', websiteFolder });

    // const paramId = util.getSsmParamId('url', stage);

    const websiteUrl = new ssm.StringParameter(this, ssmUrlParamId, {
      parameterName: ssmUrlParamId,
      stringValue: webstie.distribution.distributionDomainName,
    });
  }
}

export default DeploymentStack;
