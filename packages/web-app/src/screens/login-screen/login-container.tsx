import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'src/components/template/main-layout';

import { USER_TYPE } from 'src/domain/auth/user';
import { loginActionCreator } from 'src/domain/auth';
import { selectError, selectIsLoading } from 'src/domain/auth/selectors';

import LoginView from './login-view';

const LoginContainer = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const loading = useSelector(selectIsLoading);
    // TODO - Move is Authenticated up to a higher level
    const onSubmit = (values) => {
        const { email, password } = values;
        dispatch(loginActionCreator({ type: USER_TYPE.EMAIL, email, password }));
    };

    return (
        <MainLayout isAuthenticated={false}>
            <LoginView loading={loading} error={error.message} onSubmit={onSubmit} />
        </MainLayout>
    );
};

export default LoginContainer;
