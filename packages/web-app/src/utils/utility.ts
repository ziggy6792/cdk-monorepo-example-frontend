/* eslint-disable import/prefer-default-export */

export const defaultIfNull = <T>(checkValue: T, defaulValue: T): T => {
  if (!checkValue) {
    return defaulValue;
  }
  return checkValue;
};

export const ordinalSuffixOf = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

export const sanitizeNameInput = (name: string): string => {
  if (!name) {
    return name;
  }
  name = name.replace(/\s\s+/g, ' ');
  const separateWord = name.toLowerCase().split(' ');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
};
