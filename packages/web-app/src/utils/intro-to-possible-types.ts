/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
import { PossibleTypesMap } from '@apollo/client';

const introspectionToPossibleTypes = (recievedMap: any): PossibleTypesMap => {
    const possibleTypes = {};

    recievedMap.__schema.types.forEach(supertype => {
        if (supertype.possibleTypes) {
            possibleTypes[supertype.name] = supertype.possibleTypes.map(subtype => subtype.name);
        }
    });

    return possibleTypes;
};

export default introspectionToPossibleTypes;
