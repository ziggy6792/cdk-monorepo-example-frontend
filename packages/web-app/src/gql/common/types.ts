import { RiderAllocation, User } from 'src/generated-types';

export type IRiderOption = Pick<RiderAllocation, 'startSeed' | 'userId'> & {
    user: Pick<User, 'id' | 'fullName'>;
};

export type IRiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId' | 'position' | 'startSeed' | 'startOrder' | 'rankOrder' | 'runs'> & {
    user: Pick<User, 'fullName'>;
};
