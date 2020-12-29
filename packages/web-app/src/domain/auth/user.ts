import { CognitoUser } from '@aws-amplify/auth';
import { GuestLogin } from '../../conf/content';
/* eslint-disable @typescript-eslint/naming-convention */

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  isGuest: boolean;
}

export const mapInUser = (cognitoUser: CognitoUser): IUser => {
  if (!cognitoUser) {
    return null;
  }

  const { attributes } = cognitoUser as any;

  const id = cognitoUser.getUsername();
  // Can't find a better way to get the bloody attributes
  const { email, family_name, given_name } = attributes as any;

  const isGuest = email === GuestLogin.email;

  return {
    id,
    firstName: given_name,
    lastName: family_name,
    displayName: `${given_name} ${family_name}`,
    email,
    isGuest,
  };
};

export default IUser;
