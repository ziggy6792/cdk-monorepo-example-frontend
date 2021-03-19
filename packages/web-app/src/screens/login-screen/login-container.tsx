import React from 'react';
import MainLayout from 'src/components/template/main-layout';
import LoginView from './login-view';

const LoginContainer = () => {
    console.log('HMM');
    // TODO - Move is Authenticated up to a higher level
    const onSubmit = () => console.log('SUBMIT');
    return (
        <MainLayout isAuthenticated={false}>
            <LoginView onSubmit={onSubmit} />
        </MainLayout>
    );
};

export default LoginContainer;
