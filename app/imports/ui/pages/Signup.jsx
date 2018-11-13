import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Grid, Header, Message } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');
      }
    });
  }

  /** Display the signup form. */
  render() {
    return (
        <div className = "signup-background">
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Create a new account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                  <Form.Input
                      label="Name"
                      name="name"
                      type="name"
                      placeholder="Name"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Username"
                      name="username"
                      type="username"
                      placeholder="Username"
                      onChange={this.handleChange}
                  />
                  </Form.Group>

                  <Form.Group>
                  <Form.Input
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  </Form.Group>

                <Form.Group>
                  <Form.Input
                      label="Picture"
                      name="picture"
                      placeholder="Add an image URL"
                      type="picture"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Location"
                      name="location"
                      placeholder="Location"
                      type="location"
                      onChange={this.handleChange}
                  />
                </Form.Group>

                  <Form.Group>
                  <Form.Input
                      label="Interests"
                      name="interests"
                      placeholder="Interests"
                      type="interest"
                      onChange={this.handleChange}
                  />
                    <Form.Input
                        label="Additional Links"
                        name="links"
                        placeholder="URL"
                        type="links"
                        onChange={this.handleChange}
                    />
                  </Form.Group>

                <Form.TextArea
                  label="About You"
                  placeholder="Tell us more about yourself"
                />

                  <Form.Button color="black" content="Create your account"/>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}
