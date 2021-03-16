import React from 'react';
import { useQuery } from 'react-apollo';
import { HELLO } from 'src/graphql/custom-queries';

const HelloWorld: React.FC = () => {
    const { loading, data, error } = useQuery(HELLO);

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
