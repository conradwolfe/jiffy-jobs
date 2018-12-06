import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from '../pages/Landing';
import CompanyDash from '../pages/CompanyDash';
import StudentDash from '../pages/StudentDash';
import AdminDash from '../pages/AdminDash';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ErrorPage from '../pages/ErrorPage';
import NavBar from '../components/NavBar';
import CompanyProfile from '../pages/CompanyProfile';
import StudentProfile from '../pages/StudentProfile';
import EditCompany from '../pages/EditCompany';
import EditStudent from '../pages/EditStudent';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/cdash" component={CompanyDash}/>
              <ProtectedRoute path="/sdash" component={StudentDash}/>
              <AdminProtectedRoute path="/adash" component={AdminDash}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <ProtectedRoute path="/errorpage" component={ErrorPage}/>
              <ProtectedRoute path="/cprofile/:_id" component={CompanyProfile}/>
              <ProtectedRoute path="/sprofile/:_id" component={StudentProfile}/>
              <ProtectedRoute path="/cedit" component={EditCompany}/>
              <ProtectedRoute path="/sedit" component={EditStudent}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
