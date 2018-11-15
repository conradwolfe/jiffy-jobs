import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Button, Sidebar, Icon, Segment } from 'semantic-ui-react';

export default class Sidebar extends React.Component {
  state = { visible: false }
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  render() {
    const visible  = this.state;
    return (
        <div>
          <Button disabled={visible} onClick={this.handleShowClick}>
            <Icon name="bars"/>
          </Button>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={this.handleSidebarHide}
                vertical
                visible= visible
                width='thin'
            >
              <Menu.Item as='a'>
                Job Listings
              </Menu.Item>
              <Menu.Item as='a'>
                Notifications
              </Menu.Item>
              <Menu.Item as='a'>
                Edit Profile
              </Menu.Item>
            </Sidebar>
          </Sidebar.Pushable>
        </div>

    );
  }
}