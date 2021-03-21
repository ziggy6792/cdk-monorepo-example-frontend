import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import MainLayout from 'src/components/template/main-layout';
import View from './signup-view';

const SignupContainer: React.FC = () => {
    const onSubmit = (values) => {
        // eslint-disable-next-line no-alert
        window.alert('TODO');
    };

    return (
        <MainLayout isAuthenticated={false}>
            <View loading={false} error='' onSubmit={onSubmit} />
        </MainLayout>
    );
};

export default SignupContainer;
