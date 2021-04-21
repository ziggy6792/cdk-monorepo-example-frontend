import { RiderAllocation, User, Heat, ScheduleItem, Round, Maybe, Competition, RiderRank } from 'src/generated-types';

export type IRiderOption = Pick<RiderAllocation, 'startSeed' | 'userId'> & {
  user: Pick<User, 'id' | 'fullName'>;
};

export type IRiderAllocationItem = Pick<RiderAllocation, 'allocatableId' | 'userId' | 'position' | 'startSeed' | 'startOrder' | 'rankOrder' | 'runs'> & {
  user: Pick<User, 'fullName'>;
};

export type IWinnerItem = Pick<RiderAllocation, 'position'> & {
  user: Pick<User, 'fullName'>;
};

export type TimetableRound = { __typename?: 'Round' } & Pick<Round, 'roundNo' | 'longName'> & {
    competition: Pick<Competition, 'id'>;
  } & {
    heats: { __typename?: 'HeatList' } & { items: Array<{ __typename?: 'Heat' } & Pick<Heat, 'id' | 'name' | 'status'>> };
  };

export type TimetableScheduledItem = TimetableRound;

export type TimetableScheduleItem = { __typename?: 'ScheduleItem' } & Pick<ScheduleItem, 'scheduleId' | 'id' | 'startTime' | 'notice' | 'createdAt'> & {
    scheduledItem: Maybe<TimetableScheduledItem>;
  };

export type IRiderRankItem = Pick<RiderRank, 'userId' | 'rank'> & { user: Maybe<Pick<User, 'id' | 'fullName'>> };

export type ICompetitionSummary = Pick<Competition, 'id' | 'name' | 'startTime' | 'status'> & { judgeUser?: Pick<User, 'fullName'> } & {
  rankedRiders: { __typename?: 'RiderRankList' } & {
    items: Array<IRiderRankItem>;
  };
};
