import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { LIST_COMPETITIONS } from 'src/graphql/custom-queries';

import MainLayout from 'src/components/template/main-layout';
import View from './home-view';

const LoginContainer: React.FC<RouteComponentProps> = () => {
    const { loading, data, error } = useQuery(LIST_COMPETITIONS);
    return (
        <MainLayout isAuthenticated={false}>
            <View data={data} loading={loading} />
        </MainLayout>
    );
};

export default LoginContainer;
