/* eslint-disable import/prefer-default-export */
import 'source-map-support/register';
import { commonFunctionExample } from '@danielblignaut/common-lambda-lib/dist/utils';
import example from 'packages/lambda-a/src/example/example';

export const handler = async (event: any): Promise<any> => {
  console.log('example', example);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: commonFunctionExample(),
    }),
  };
};
