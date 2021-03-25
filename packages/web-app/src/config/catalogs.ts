import { Gender, Level, Sport } from 'src/generated-types';

export interface ICatalogItem {
    id: string;
    description: string;
    displayText?: string;
    isDefault?: boolean;
}

export type Catalog = ICatalogItem[];

export const CATALOG_GENDER: Catalog = [
    { id: Gender.Any, description: 'Any', displayText: null },
    { id: Gender.Male, description: 'Male', displayText: 'Mens' },
    { id: Gender.Female, description: 'Female', displayText: 'Womans' },
];

export const CATALOG_LEVEL: Catalog = [
    { id: Level.Any, description: 'Any', displayText: null },
    { id: Level.Beginner, description: 'Beginner', displayText: 'Beginner' },
    { id: Level.Intermediate, description: 'Intermediate', displayText: 'Intermediate' },
    { id: Level.Advanced, description: 'Advanced', displayText: 'Advanced' },
    { id: Level.Professional, description: 'Professional', displayText: 'Professional' },
];

export const CATALOG_SPORT: Catalog = [
    { id: Sport.Wakeboard, description: 'Wakeboard', displayText: 'Wakeboard', isDefault: true },
    { id: Sport.Wakeskate, description: 'Wakeskate', displayText: 'Wakeskate' },
];
