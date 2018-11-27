import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Icon, Form, Dropdown } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      marginBottom: '10px',
      backgroundColor: 'white',
    };

    return (
        <div>
          <Menu borderless style={menuStyle} attached="top">
            <Menu.Item compact as={NavLink} activeClassName="" exact to="/">
              <Header as='h2'>JJ</Header>
            </Menu.Item>
            <Menu.Item compact>
              <Form>
                <Form.Group>
                  <Form.Field>
                    <Form.Input
                        icon="search"
                        iconPosition="left"
                        name="search"
                        type="dark-text"
                        placeholder='Search'
                    />
                  </Form.Field>
                  <Form.Button content="Search"/>
                </Form.Group>
              </Form>
            </Menu.Item>
            <Menu.Item compact position="right" as={NavLink} exact to="/cprofile"><Icon size="large" name="user circle"/></Menu.Item>
            <Menu.Item compact as={NavLink} exact to="/errorpage"><Icon size="large" name="home"/></Menu.Item>
              {(() => {
                  if (Roles.userIsInRole(Meteor.userId(), 'company')) {
                      return (
                          <Menu.Item compact as={NavLink} exact to="/cdash"><Icon size="large" name="suitcase"/></Menu.Item>
                      )
                  } else if (Roles.userIsInRole(Meteor.userId(), 'student')) {
                      return (
                          <Menu.Item compact as={NavLink} exact to="/sdash"><Icon size="large" name="suitcase"/></Menu.Item>
                      )
                  } else {
                      return (
                          <Menu.Item compact as={NavLink} exact to="/errorpage"><Icon size="large" name="suitcase"/></Menu.Item>
                      )
                  }
              })()}
            <Menu.Item compact>
              {this.props.currentUser === '' ? (
                  <Dropdown icon='th' floating labeled button>
                    <Dropdown.Menu className='left'>
                      <Dropdown.Header content={"Currently not signed in"}/>
                    </Dropdown.Menu>
                  </Dropdown>
              ) : (
                  <Dropdown icon='th' floating labeled button>
                    <Dropdown.Menu className='left'>
                      <Dropdown.Header content={"Signed in as " + this.props.currentUser}/>
                      <Dropdown.Divider/>
                      <Dropdown.Item as={NavLink} exact to="/errorpage">
                        <Icon name="settings" className="left floated"/>
                        <div className="landing-text-dark">
                          Settings
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} exact to="/errorpage">
                        <Icon name="user" className="left floated"/>
                        <div className="landing-text-dark">
                          Edit Profile
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} exact to="/errorpage">
                        <Icon name="bell" className="left floated"/>
                        <div className="landing-text-dark">
                          Notifications
                        </div>
                      </Dropdown.Item>
                      {this.props.currentUser ? (
                          <Dropdown.Item as={NavLink} exact to="/signout">
                            <Icon name="sign-out" className="left floated"/>
                            <div className="landing-text-dark">
                              Sign Out
                            </div>
                          </Dropdown.Item>
                      ) : ''}
                    </Dropdown.Menu>
                  </Dropdown>
              )}
            </Menu.Item>
          </Menu>
        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
