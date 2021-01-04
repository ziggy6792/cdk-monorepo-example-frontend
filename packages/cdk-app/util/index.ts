/* eslint-disable import/prefer-default-export */
import * as config from '../config';

const ssmSep = '/';
const conSep = '-';

export const getConstructId = (constructId: string, stage?: string): string => {
  const contItems = [config.PROJECT_NAME, constructId, stage].filter((v) => v != null);

  return contItems.join(conSep);
};

export const getSsmParamId = (paramPath: string, stage?: string): string => {
  const pathItems = ['', config.PROJECT_NAME, stage, paramPath].filter((v) => v != null);

  return pathItems.join(ssmSep);
};
