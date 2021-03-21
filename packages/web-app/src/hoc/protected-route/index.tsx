/**
 *
 * ProtectedRoute
 *
 */
import React from 'react';
import * as routeConfig from 'src/config/routes';
import { Redirect, Route, RouteProps } from 'react-router-dom';

// Naieve implementation of a protected route - will sync on you before expanding this

interface ILocalProps {
    isAuthenticated: boolean;
    component: any;
}

type IProps = RouteProps & ILocalProps;

//  const ProtectedRoute: React.FC<IProps> = ({ component: Component, isAuthenticated, ...rest }) =>  <Route {...rest} render={
//     // eslint-disable-next-line consistent-return
//     props => {
//         if(isAuthenticated){
//             return  <Component {...rest} {...props} />
//         }
//         <Redirect to={routeConfig.ROUTE_HOME} />}
//     } />

const ProtectedRoute: React.FC<IProps> = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={
            // eslint-disable-next-line consistent-return
            (props) => {
                if (isAuthenticated) {
                    return <Component {...rest} {...props} />;
                }
                return <Redirect to='/' />;
            }
        }
    />
);

export default ProtectedRoute;
