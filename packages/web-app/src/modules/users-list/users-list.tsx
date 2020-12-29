import React from 'react';
import { useQuery } from 'react-apollo';
import { HELLO } from '../../graphql/custom-queries';

const UsersList = () => {
  const { loading, data, error } = useQuery(HELLO);

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

export default UsersList;
