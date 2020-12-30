import React from 'react';
import { useQuery } from 'react-apollo';
import { HELLO } from '../../graphql/custom-queries';

const UsersList: React.FC = () => {
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
      {!loading && <div>bla {JSON.stringify(data)}</div>}
    </>
  );
};

export default UsersList;
