import { RiderAllocation, User, Heat, ScheduleItem, Round, Maybe } from 'src/generated-types';

export type IRiderOption = Pick<RiderAllocation, 'startSeed' | 'userId'> & {
    user: Pick<User, 'id' | 'fullName'>;
};

export type IRiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId' | 'position' | 'startSeed' | 'startOrder' | 'rankOrder' | 'runs'> & {
    user: Pick<User, 'fullName'>;
};

export type TimetableRound = { __typename?: 'Round' } & Pick<Round, 'roundNo' | 'name'> & {
        heats: { __typename?: 'HeatList' } & { items: Array<{ __typename?: 'Heat' } & Pick<Heat, 'id' | 'name'>> };
    };

export type TimetableScheduledItem = TimetableRound;

export type TimetableScheduleItem = { __typename?: 'ScheduleItem' } & Pick<ScheduleItem, 'scheduleId' | 'id' | 'startTime' | 'notice' | 'createdAt'> & {
        scheduledItem: Maybe<TimetableScheduledItem>;
    };
