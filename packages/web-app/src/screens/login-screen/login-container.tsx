import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import * as routeConfig from 'src/config/routes';
import { USER_TYPE } from 'src/domain/auth/user';
import { loginActionCreator } from 'src/domain/auth';
import { selectError, selectIsLoading, selectUser } from 'src/domain/auth/selectors';

import MainLayout from 'src/components/template/main-layout';
import LoginView from './login-view';

const LoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const loading = useSelector(selectIsLoading);
    const user = useSelector(selectUser);
    // TODO - Move is Authenticated up to a higher level

    React.useEffect(() => {
        if (user) {
            history.push(routeConfig.ROUTE_HOME);
        }
    }, [history, user]);

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
