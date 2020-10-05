import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserAuthContext } from '../FireBaseAuth/auth';

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useContext(UserAuthContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};
export default PrivateRoute;