import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';
import Footer from '../components/Footer';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
         <div>
          <div className = "signin-background">
            <Container>
              <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">
                      <div className = "login-header">
                        Login to your account
                      </div>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                      <Segment basic>
                          <Divider/>
                          <Form.Field>
                            <div className = "login-font">
                              <label>Email Address</label>
                            </div>
                            <Form.Input transparent
                                icon="user"
                                iconPosition="left"
                                name="email"
                                type="text"
                                placeholder = 'Email'
                                onChange={this.handleChange}
                            />
                          </Form.Field>
                          <Divider/>
                          <Form.Field>
                            <div className = "login-font">
                              <label>Password</label>
                            </div>
                            <Form.Input transparent
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChange}
                            />
                          </Form.Field>
                          <Form.Button centered fluid content="Login"/>
                      </Segment>
                    </Form>

                  {this.state.error === '' ? (
                      ''
                  ) : (
                      <Message
                          error
                          header="Login was not successful"
                          content={this.state.error}
                      />
                  )}
                </Grid.Column>
              </Grid>
            </Container>
          </div>
          <Footer/>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
export default Signin;
