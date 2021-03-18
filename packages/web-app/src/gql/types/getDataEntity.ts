/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HeatStatus } from './../../types/globalTypes';

// ====================================================
// GraphQL query operation: getDataEntity
// ====================================================

export interface getDataEntity_getDataEntity_Event {
    __typename: 'Event';
    createdAt: string;
    id: string | null;
    name: string;
}

export interface getDataEntity_getDataEntity_Competition {
    __typename: 'Competition';
    createdAt: string;
    id: string | null;
    name: string;
    judgeUserId: string;
}

export interface getDataEntity_getDataEntity_Heat {
    __typename: 'Heat';
    createdAt: string;
    id: string | null;
    name: string;
    status: HeatStatus;
}

export type getDataEntity_getDataEntity = getDataEntity_getDataEntity_Event | getDataEntity_getDataEntity_Competition | getDataEntity_getDataEntity_Heat;

export interface getDataEntity {
    getDataEntity: getDataEntity_getDataEntity | null;
}

export interface getDataEntityVariables {
    id: string;
}
