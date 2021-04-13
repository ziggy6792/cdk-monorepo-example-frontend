import * as cdk from '@aws-cdk/core';
import * as ssm from '@aws-cdk/aws-ssm';
import * as defaults from '@aws-solutions-constructs/core';
import { SPADeploy } from 'src/constructs/spa-deploy';

export interface DeploymentStackProps extends cdk.StackProps {
  readonly websiteFolder: string;
  readonly ssmUrlParamId: string;
}
class DeploymentStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: DeploymentStackProps) {
    super(scope, id, props);

    const { websiteFolder, ssmUrlParamId } = props;

    const webstie = new SPADeploy(this, 'website').createSiteWithCloudfront({
      indexDoc: 'index.html',
      errorDoc: 'index.html',
      websiteFolder,
      cloudfrontExtraDistibutionPaths: ['/config/*'],
    });

    const websiteUrl = new ssm.StringParameter(this, ssmUrlParamId, {
      parameterName: ssmUrlParamId,
      stringValue: webstie.distribution.distributionDomainName,
    });

    // const distribution = webstie.distribution..node.findChild('CFDistribution');

    // const childIds = distribution.node.children.map((child) => child.node.id);

    // defaults.printWarning(JSON.stringify(childIds));
  }
}

export default DeploymentStack;
