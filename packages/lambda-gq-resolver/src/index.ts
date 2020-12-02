/* eslint-disable import/prefer-default-export */
import 'source-map-support/register';

export const handler = async (event: any): Promise<any> => {
  return {
    statusCode: 200,
    body: 'hello from lambda-gq-resolver',
  };
};
