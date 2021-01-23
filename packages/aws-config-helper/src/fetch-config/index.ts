/* eslint-disable camelcase */
import SSM from 'aws-sdk/clients/ssm';

const fetchConfig = async (configPath: string): Promise<any> => {
    const ssm = new SSM();
    const param = await ssm.getParameter({ Name: configPath }).promise();

    return JSON.parse(param.Parameter.Value);
};

export default fetchConfig;
