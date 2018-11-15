import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Icon, Divider, Form } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      marginBottom: '10px',
      backgroundColor: 'white'
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
            <Menu.Item compact position="right"><Icon size="large" name="user circle"/></Menu.Item>
            <Menu.Item compact><Icon size="large" name="home"/></Menu.Item>
            <Menu.Item compact><Icon size="large" name="suitcase"/></Menu.Item>
            <Divider/>
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
