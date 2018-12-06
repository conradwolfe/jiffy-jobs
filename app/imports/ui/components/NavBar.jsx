import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink,  Link, Redirect } from 'react-router-dom';
import { Menu, Header, Icon, Form, Dropdown } from 'semantic-ui-react';
import { CompanyInfo, CompanyIndex } from '/imports/api/companyinfo/companyinfo';
import { StudentInfo, StudentInfo } from '/imports/api/studentinfo/studentinfo';
import { Roles } from 'meteor/alanning:roles';
import { Index, MinimongoEngine } from 'meteor/easy:search'

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.findProfile = this.findProfile.bind(this);
  }

  findProfile() {
    if (Roles.userIsInRole(Meteor.userId(), 'company')) {
      if (this.props.ready) {
        const companyfetch = CompanyInfo.find({}).fetch()[0];
        return companyfetch._id;
      }
    }
    if (Roles.userIsInRole(Meteor.userId(), 'student')) {
      if (this.props.ready) {
        const studentfetch = StudentInfo.find({}).fetch()[0];
        return studentfetch._id;
      }
    }
    return '';
  }

  handleSSearch() {

  }

  handleCSearch() {

  }

  render() {
    const menuStyle = {
      marginBottom: '10px',
      backgroundColor: 'white',
    };
    return (
        <div>
          {(() => {
            if (Roles.userIsInRole(Meteor.userId(), 'company')) {
              if (this.state.redirectToReferer) {
                return <Redirect to={'/CompanySearch'}/>;
              }
              return (
                  <Menu borderless style={menuStyle} attached="top">
                    <Menu.Item compact as={NavLink} activeClassName="" exact to="/">
                      <Header as='h2'>JJ</Header>
                    </Menu.Item>
                    <Menu.Item compact>
                      <Form onSubmit={this.handleCSearch}>
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
                    <Menu.Item compact position="right" as={NavLink} exact to={`/cprofile/${this.findProfile()}`}>
                      <Icon size="large" name="user circle"/></Menu.Item>
                    <Menu.Item compact as={NavLink} exact to="/sdash">
                      <Icon size="large" name="suitcase"/></Menu.Item>
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
                              <Dropdown.Item as={NavLink} exact to="/cedit">
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
              );
            }
            if (Roles.userIsInRole(Meteor.userId(), 'student')) {
              if (this.state.redirectToReferer) {
                return <Redirect to={'/StudentSearch'}/>;
              }
              return (
                  <Menu borderless style={menuStyle} attached="top">
                    <Menu.Item compact as={NavLink} activeClassName="" exact to="/">
                      <Header as='h2'>JJ</Header>
                    </Menu.Item>
                    <Menu.Item compact>
                      <Form onSubmit={this.handleSSearch}>
                        <Form.Group>
                          <Form.Field>
                            <Form.Input
                                icon="search"
                                iconPosition="left"
                                name="search"
                                type="dark-text"
                                placeholder='Search'
                                onChange={this.handleChange}
                            />
                          </Form.Field>
                          <Form.Button content="Submit"/>
                        </Form.Group>
                      </Form>
                    </Menu.Item>
                    <Menu.Item compact position="right" as={NavLink} exact to={`/sprofile/${this.findProfile()}`}>
                      <Icon size="large" name="user circle"/></Menu.Item>
                    <Menu.Item compact as={NavLink} exact to="/cdash">
                      <Icon size="large" name="suitcase"/></Menu.Item>
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
                              <Dropdown.Item as={NavLink} exact to="/sedit">
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
              );
            }
            if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
              return (
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
                    <Menu.Item compact position="right" as={NavLink} exact to="/adash">
                      <Icon size="large" name="suitcase"/></Menu.Item>
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
              );
            }
            return (
                <Menu borderless style={menuStyle} attached="top">
                  <Menu.Item compact as={NavLink} activeClassName="" exact to="/">
                    <Header as='h2'>JJ</Header>
                  </Menu.Item>

                  <Menu.Item position="right" compact>
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
            );
          })()}
        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => {
  const subscription1 = Meteor.subscribe('CompanyProfileInfo');
  const subscription2 = Meteor.subscribe('StudentProfileInfo');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: (subscription1.ready() && subscription2.ready()),
  };
})(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
