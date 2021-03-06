import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Container } from 'semantic-ui-react';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    const divStyle = { paddingTop: '100px', paddingBottom: '150px' };
    return (
        <div>
          <div className="landing-background">
            <Container>
              <Header as="h2" textAlign="center">
                <div style={divStyle} className="landing-text">
                  <p>You are signed out.</p>
                </div>
                <Button fluid as={NavLink} exact to="/">
                  Return to Homepage
                </Button>
              </Header>
            </Container>
          </div>
          <Footer/>
        </div>
    );
  }
}
