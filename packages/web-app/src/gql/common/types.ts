import { RiderAllocation, User, Heat, ScheduleItem, Notice, Round } from 'src/generated-types';

export type IRiderOption = Pick<RiderAllocation, 'startSeed' | 'userId'> & {
    user: Pick<User, 'id' | 'fullName'>;
};

export type IRiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId' | 'position' | 'startSeed' | 'startOrder' | 'rankOrder' | 'runs'> & {
    user: Pick<User, 'fullName'>;
};

export type TimetableRound = { __typename?: 'Round' } & Pick<Round, 'roundNo' | 'name'> & {
        heats: { items: Array<Pick<Heat, 'id' | 'name'>> };
    };

export type TimetableNotice = { __typename?: 'Notice' } & Pick<Notice, 'notice'>;

export type TimetableScheduledItem = TimetableRound | TimetableNotice;

export type TimetableScheduleItem = Pick<ScheduleItem, 'scheduleId' | 'startTime' | 'schedulableId'> & {
    scheduledItem: TimetableScheduledItem;
};
