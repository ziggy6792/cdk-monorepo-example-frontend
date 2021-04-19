/* eslint-disable import/prefer-default-export */
export const parseLongName = (value: string): string[] => {
  const titleArray = value.split(' - ');
  const title = titleArray[0];
  const subTitle = `${titleArray[1]} - ${titleArray[2]}`;

  return [title, subTitle];
};
