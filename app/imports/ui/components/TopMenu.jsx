import React from 'react';
import { Container, Menu, Dropdown, Icon } from 'semantic-ui-react';

export default class TopMenu extends React.Component {
  render() {
    return (
        <Menu borderless className="topmenu">
          <Container>
            <Menu.Item fitted position ="right"><Icon name="user circle"/></Menu.Item>
          <Dropdown item text='Profile'>
            <Dropdown.Menu>
              <Dropdown.Item>Matches</Dropdown.Item>
              <Dropdown.Item>Automotive</Dropdown.Item>
              <Dropdown.Item>Home</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Container>
        </Menu>
    );
  }
}
