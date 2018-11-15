import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Container, Image } from 'semantic-ui-react';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';

export default class ErrorPage extends React.Component {
  render() {
    const divStyle = { paddingTop: '100px', paddingBottom: '10px' };
    return (
        <div>
          <div className = "landing-background">
            <Container>
              <Header as="h2" textAlign="center">
                <div style={divStyle} className = "landing-text">
                  <p>Wow. Such 404. Page Not Found.</p>
                </div>
              </Header>
              <Image rounded centered size="huge" src="/images/spaceDoge.png"/>
              <Button fluid as={NavLink} exact to="/">
                Return to Homepage
              </Button>
            </Container>
          </div>
          <Footer/>
        </div>
    );
  }
}
