import React, { useCallback, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';
import Spinner from '../../components/spinner';

import { LOGIN } from '../../graphql/local-mutations';
import { GET_AUTHENTICATED_USER } from '../../graphql/local-queries';

// eslint-disable-next-line @typescript-eslint/ban-types
const withAuthenticator = <P extends object>(C: React.ComponentType<P>) => (props: P) => {
  const { data: authUserData, loading: authUserLoading, refetch: onCheckAuth } = useQuery(GET_AUTHENTICATED_USER, { fetchPolicy: 'cache-and-network' });

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN, {
    refetchQueries: [
      {
        query: GET_AUTHENTICATED_USER,
      },
    ],
  });
  const client = useApolloClient();

  const authenticatedUser = authUserData ? authUserData.getAutenticatedUser : undefined;

  const login = useCallback(
    async (loginData = null) => {
      // Logger.info("withAuthenticator - ", loginData)
      client.cache.reset();
      return loginMutation({ variables: loginData });
      // client.resetStore();
    },
    [loginMutation, client]
  );

  const onLogout = () => login(); // Call login as guest

  useEffect(() => {
    if (!authenticatedUser && !authUserLoading) {
      login();
      // Login as guest
    }
    return () => {
      // Do nothing
    };
  }, [login, authenticatedUser, authUserLoading]);

  // if (authUserLoading || loginLoading || !authenticatedUser) return <Spinner debugText='withAuthenticator' />;
  // #ToDo authUserLoading check casues can't perform a React state update on.. error not sure why
  if (loginLoading || !authenticatedUser) return <Spinner />;

  console.log('GET_SELECTED_HEAT got authenticated user', authenticatedUser);

  const auth = {
    user: authenticatedUser,
    isAuthenticated: authenticatedUser.isAuthenticated,
    onLogin: login,
    onCheckAuth,
    onLogout,
  };

  // return <C {...props} user={user} auth={auth} onLogin={login} onCheckAuth={onCheckAuth} onLogout={onLogout} />;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <C {...(props as P)} auth={auth} />;
};

export default withAuthenticator;
