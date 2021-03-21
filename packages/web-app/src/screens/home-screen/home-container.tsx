import React from 'react';
import { useQuery } from 'react-apollo';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { LIST_COMPETITIONS } from 'src/graphql/custom-queries';
import { selectIsAuthenticated } from 'src/domain/auth/selectors';

import MainLayout from 'src/components/template/main-layout';
import View from './home-view';

const LoginContainer: React.FC<RouteComponentProps> = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const { loading, data, error } = useQuery(LIST_COMPETITIONS);
    return (
        <MainLayout isAuthenticated={isAuthenticated}>
            <View data={data} loading={loading} />
        </MainLayout>
    );
};

export default LoginContainer;
