import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './FireBaseAuth/Login';
import AdminDashBoard from './Pages/AdminDashBoard/AdminDashBoard';
import Home from './Pages/Home/Home';
import notMatchedRoute from './Pages/NotMatchedRoute/notMatchedRoute';
import RegisterVolunteer from './Pages/RegisterVolunteer/RegisterVolunteer';
import VolunteerDetails from './Pages/RegisterVolunteer/VolunteerDetails';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />;
            <Route exact path="/home" component={Home} />;

            <PrivateRoute exact path="/register/:evtTitle"><RegisterVolunteer /></PrivateRoute>
            <PrivateRoute exact path="/volunteer-details"><VolunteerDetails /></PrivateRoute>
            <Route exact path="/admin-dashboard"><AdminDashBoard /></Route>

            <Route exact path="/login" component={Login} />;
            <Route path="*" component={notMatchedRoute} />
        </Switch>
    );
};

export default Routes;