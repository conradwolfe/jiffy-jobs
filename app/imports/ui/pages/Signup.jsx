import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Container, Divider, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import Footer from '../components/Footer';


/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstname: '', lastname: '', email: '', password: '', usertype: '', error: '' };
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
    Router.go('/signin');
    const { firstname, lastname, email, password, usertype } = this.state;
    Meteor.call('serverCreateUser', firstname, lastname, email, password, usertype, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const options = [{ key: 's', text: 'Student', value: 'student' },
      { key: 'c', text: 'Company', value: 'company' }];
    return (
          <div className = "signup-background">
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={1}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                <div className = "signup-header">
                Register for an account
                </div>
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment basic>
                    <Form.Field>
                      <div className = "signup-font">
                        <label>First Name</label>
                      </div>
                  <Form.Input transparent
                      icon="user"
                      iconPosition="left"
                      name="firstname"
                      required={true}
                      type="text"
                      placeholder="First Name"
                      onChange={this.handleChange}
                  />
                    </Form.Field>
                    <Divider/>
                      <Form.Field>
                        <div className = "signup-font">
                          <label>Last Name</label>
                        </div>
                  <Form.Input transparent
                      icon="address card"
                      iconPosition="left"
                      name="lastname"
                      required={true}
                      type="text"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                  />
                      </Form.Field>
                    <Divider/>
                  <Form.Field>
                    <div className = "signup-font">
                      <label>Email</label>
                    </div>
                  <Form.Input transparent
                      icon="envelope outline"
                      iconPosition="left"
                      name="email"
                      required={true}
                      type="text"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                </Form.Field>
                    <Divider/>
                  <Form.Field>
                    <div className = "signup-font">
                      <label>Password</label>
                    </div>
                  <Form.Input transparent
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      required={true}
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
              </Form.Field>
                    <Divider/>
                  <Form.Field>
                    <div className = "signup-font">
                      <label>User Type</label>
                    </div>
                  <Form.Select transparent
                      icon="dropdown"
                      iconPosition="right"
                      name="usertype"
                      required={true}
                      type="text"
                      placeholder="User Type"
                      options={options}
                      onChange={this.handleChange}
                  />
            </Form.Field>
                    <Divider/>
                  <Form.Field>
                    <div className = "signup-font">
                      <label>I agree to the Terms and Conditions</label>
                    </div>
                  <Form.Checkbox
                      required={true}
                  />
                  </Form.Field>
                  <Divider/>
                  <Form.Field>
                  <Form.Button centered fluid content="Submit"/>
                  </Form.Field>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login  <Link to="/signin">here</Link>
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
            <Footer/>
          </div>
    );
  }
}
