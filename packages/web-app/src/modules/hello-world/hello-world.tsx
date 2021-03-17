import React from 'react';
import { useQuery } from 'react-apollo';
import { GET_DATA_ENTITY, HELLO } from 'src/graphql/custom-queries';

const HelloWorld: React.FC = () => {
    const { loading, data, error } = useQuery(GET_DATA_ENTITY, { variables: { id: 'testCompetition' } });

    if (error) {
        console.log('error', error);
    }

    // const apollo = useApolloClient();

    // useEffect(() => {
    //   apollo.query({ query: HELLO });
    // }, []);

    return (
        <>
            {loading && <div>loading</div>}
            {!loading && <div>{JSON.stringify(data)}</div>}
        </>
    );
};

export default HelloWorld;
