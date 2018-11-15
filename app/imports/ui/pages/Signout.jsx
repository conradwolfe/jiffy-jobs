import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header } from 'semantic-ui-react';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
        <div>
          <div className = "landing-background">
            <Header as="h2" textAlign="center">
              <div className = "landing-text">
                <p>You are signed out.</p>
                <Button fluid as={NavLink} exact to="/">
                  Return to Homepage
                </Button>
              </div>
            </Header>
          </div>
          <Footer/>
        </div>
    );
  }
}
