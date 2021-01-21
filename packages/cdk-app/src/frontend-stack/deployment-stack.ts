import * as cdk from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';
import * as ssm from '@aws-cdk/aws-ssm';

export interface DeploymentStackProps extends cdk.StackProps {
    readonly websiteFolder: string;
    readonly ssmUrlParamId: string;
    readonly ssmS3BucketParamId: string;
}
class DeploymentStack extends cdk.Stack {
    public readonly urlOutput: cdk.CfnOutput;

    constructor(scope: cdk.Construct, id: string, props?: DeploymentStackProps) {
        super(scope, id, props);

        const { websiteFolder, ssmUrlParamId, ssmS3BucketParamId } = props;

        const webstie = new SPADeploy(this, 'website').createSiteWithCloudfront({ indexDoc: 'index.html', errorDoc: 'index.html', websiteFolder });

        const websiteUrl = new ssm.StringParameter(this, ssmUrlParamId, {
            parameterName: ssmUrlParamId,
            stringValue: webstie.distribution.distributionDomainName,
        });

        const s3Bucket = new ssm.StringParameter(this, ssmS3BucketParamId, {
            parameterName: ssmS3BucketParamId,
            stringValue: webstie.websiteBucket.bucketName,
        });
    }
}

export default DeploymentStack;
