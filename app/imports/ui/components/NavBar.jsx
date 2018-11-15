import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} attached="top">
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header as='h1'>JJ</Header>
          </Menu.Item>
        <Menu.Item position="right">
          <Menu.Item fitted position ="right"><Icon size="big" name="user circle"/></Menu.Item>
          <Menu.Item fitted ><Icon size="big" name="home"/></Menu.Item>
          <Menu.Item fitted ><Icon size="big" name="suitcase"/></Menu.Item>
          <Menu.Item fitted ><Icon size="big" name="search"/></Menu.Item>
        </Menu.Item>
      </Menu>

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
