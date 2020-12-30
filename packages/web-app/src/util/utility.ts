/* eslint-disable import/prefer-default-export */

export const defaultIfNull = <T>(checkValue: T, defaulValue: T): T => {
  if (!checkValue) {
    return defaulValue;
  }
  return checkValue;
};
