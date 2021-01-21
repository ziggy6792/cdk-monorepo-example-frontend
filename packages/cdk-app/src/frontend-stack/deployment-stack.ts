import * as cdk from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';
import * as ssm from '@aws-cdk/aws-ssm';

export interface DeploymentStackProps extends cdk.StackProps {
    readonly websiteFolder: string;
    readonly ssmUrlParamId: string;
    readonly ssmS3BucketParamId: string;
    readonly ssmDistributionId: string;
}
class DeploymentStack extends cdk.Stack {
    public readonly urlOutput: cdk.CfnOutput;

    constructor(scope: cdk.Construct, id: string, props?: DeploymentStackProps) {
        super(scope, id, props);

        const { websiteFolder, ssmUrlParamId, ssmS3BucketParamId, ssmDistributionId } = props;

        const webstie = new SPADeploy(this, 'website').createSiteWithCloudfront({ indexDoc: 'index.html', errorDoc: 'index.html', websiteFolder });

        const websiteUrlSsm = new ssm.StringParameter(this, ssmUrlParamId, {
            parameterName: ssmUrlParamId,
            stringValue: webstie.distribution.distributionDomainName,
        });

        const s3BucketSsm = new ssm.StringParameter(this, ssmS3BucketParamId, {
            parameterName: ssmS3BucketParamId,
            stringValue: webstie.websiteBucket.bucketName,
        });

        const distributionIdSsm = new ssm.StringParameter(this, ssmS3BucketParamId, {
            parameterName: ssmDistributionId,
            stringValue: webstie.distribution.distributionId,
        });
    }
}

export default DeploymentStack;
