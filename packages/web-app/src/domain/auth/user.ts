import { CognitoUser } from '@aws-amplify/auth';

/* eslint-disable @typescript-eslint/naming-convention */

export enum USER_TYPE {
    'EMAIL' = 'email',
    'FACEBOOK' = 'facebook',
}
interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
}

export const mapInUser = (cognitoUser: CognitoUser): IUser => {
    if (!cognitoUser) {
        return null;
    }

    const { attributes } = cognitoUser as any;

    const id = cognitoUser.getUsername();
    // Can't find a better way to get the bloody attributes
    const { email, family_name, given_name } = attributes as any;

    return {
        id,
        firstName: given_name,
        lastName: family_name,
        displayName: `${given_name} ${family_name}`,
        email,
    };
};

export default IUser;
