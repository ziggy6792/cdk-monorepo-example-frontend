/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useGetDataEntityQuery } from 'src/generated-types';

const HelloWorld: React.FC = () => {
    const { loading, data, error } = useGetDataEntityQuery({ variables: { id: 'testCompetition' } });

    if (error) {
        console.log('error', error);
    }

    return (
        <>
            {loading && <div>loading</div>}
            {!loading && <div>{JSON.stringify(data)}</div>}
        </>
    );
};

export default HelloWorld;
