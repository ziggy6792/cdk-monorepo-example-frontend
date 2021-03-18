import DataEntity from './abstract/data-entity';

export enum EventStatus {
    REGISTRATION_OPEN = 'REGISTRATION_OPEN',
    REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
    FINALIZED = 'FINALIZED',
}

interface Event extends DataEntity {
    description: string;

    startTime: string;

    status: EventStatus;

    adminUserId: string;

    selectedHeatId: string;
}

export default Event;
