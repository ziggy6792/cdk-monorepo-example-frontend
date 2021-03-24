import { RiderAllocation, User } from 'src/generated-types';

export type RiderOption = Pick<RiderAllocation, 'startSeed' | 'userId'> & {
    user: Pick<User, 'id' | 'fullName'>;
};
